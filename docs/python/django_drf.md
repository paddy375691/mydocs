#### 基础理论一：FBV

先看fbv样例

```python
# views.py
def get_book(request):
    if request.method == "GET":
        return HttpResponse("GET method")
    elif request.method == "POST":
        return HttpResponse("POST method")
    return None

# urls.py
from book.views import get_book
urlpatterns += [
    path('book/', get_book)
]
```



验证GET方法

![image-20250209195214542](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250209195214542.png)



验证POST方法：
![image-20250209195339078](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250209195339078.png)



#### 基础理论二：反射

一个反射例子，根据传入的str，来决定执行什么方法

```python
class Animal:
    def __init__(self, name, age, func_str):
        self.name = name
        self.age = age
        func = getattr(self, func_str)
        func()

    def sleep(self):
        print("动物正在睡觉")

    def eat(self):
        print("正在吃")


class Dog(Animal):
    def sleep(self):
        print("小狗在睡觉")


if __name__ == '__main__':
    dog = Dog("ppap", 25, "sleep")  # 输出->小狗在睡觉
```



#### 基础理论三： CBV （class-vased view)

使用CBV的方式来重写上面FBV的例子：

```python
# views.py
class BookView(View):
    def get(self, request):
        return HttpResponse("GET mothod")

    def post(self, request):
        return HttpResponse("POST method")

# urls.py, 使用as_view()来实现
from book.views import BookView
urlpatterns += [
    path('book/', BookView.as_view())
]
```

验证过程和之前一致



#### CBV 源码分析

- django 如何实现 get请求，走到CBV的get方法里

> CBV 的本质还是FBV

![image-20250209201328601](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250209201328601.png)



```python
'''
    path('book/', BookView.as_view())
    path('book/', View.view)   本质上是执行的view函数 
'''
```



![image-20250209201904857](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250209201904857.png)

- 这里self 就是BookView的实例对象， self.dispatch -> 会从BookView -> View 的链上找

![image-20250209202118917](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250209202118917.png)

- 最终就是根据BookView 里写的get函数的返回内容来返回
- 请求路径：/book/  ->  view()  -> return dispatch()  -> return get()



##### 示例，重写dispatch

```python
class BookView(View):
    def dispatch(self, request, *args, **kwargs):
        print("BookView dispatch")
        return super().dispatch(request, *args, **kwargs) # 调用View.dispatch 不影响逻辑
```



#### DRF_ APIView解析

APIView 继承自 View,   重写上面的BookView只需要修改继承自APIView

> APIView在View基础上扩展了一些能力

```python
from rest_framework.views import APIView
class BookView(APIView):
```



APIView 的dispatch 方法扩展的内容

![image-20250209220218292](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250209220218292.png)

> 旧的request.POST 只能拿到urlencoded的数据，前后端分离的环境下，会使用json



![image-20250209220958697](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250209220958697.png)



验证新的request取数据

```python
    def get(self, request): 
        print("data:", request.query_params) 
        # 传入http://localhost:8000/book/?a=1
        # 结果: data: <QueryDict: {'a': ['1']}>
        return HttpResponse("GET mothod")

    def post(self, request):
        print("data:", request.data)
        # 利用postman传入json数据  {"a":"1"}
        # 结果: data: {'a': '1'}
        return HttpResponse("POST method")
```

##### 总结：

- APIView的核心就是构建了新的request
- 对于取数据会更方便



#### 序列化器-Serializer (核心)



目标：围绕Book资源做 增删改查查 接口

基于APIView实现这些接口

- 序列化：从模型类转为json
- 反序列化：前端传的数据转为模型

```python
# models.py
class Book(models.Model):
    title = models.CharField(max_length=32, verbose_name="书籍名称")
    price = models.IntegerField(verbose_name="价格")
    pub_date = models.DateField(verbose_name="初版日期")

# serializers.py
class BookSerializers(serializers.Serializer):
    title = serializers.CharField(max_length=32)
    price = serializers.IntegerField()
    pub_date = serializers.DateField()

# views.py
from rest_framework.response import Response
class BookView(APIView):
    def get(self, request):
        book_list = Book.objects.all()
        serializer = BookSerializers(instance=book_list, many=True)  # 创建序列化器
        # return HttpResponse(serializer.data)  # 返回序列化的结果
        return Response(serializer.data) # 通过Response能更好处理序列化后的结果
```



实质上，序列化器要做的内容是列表套字典赋值

```python
class BookView(APIView):
    def get(self, request):
        book_list = Book.objects.all()
        serializer = BookSerializers(instance=book_list, many=True)  # 创建序列化器
        """
        # 序列化器做的事情，可以归纳为以下
        temp = []
        for obj in book_dist:
            d = {}  # 取book_list, key值根据序列化器来确认
            d['title'] = obj.title
            ...
            temp.append(obj)
        """
        return HttpResponse(serializer.data)  # 返回序列化的结果
```



原始的POST流程

```python
    def post(self, request):
        """
        需要反序列化, 有数据校验过程，从前端拿到数据
        """
        # 构建序列化器对象
        serilaizer = BookSerializers(data=request.data)  # 反序列化传data
        if serilaizer.is_valid(): # 返回bool值，把校验通过的写在serializer.validated_data  错误写在serializer.errors
            # 校验通过，插入到数据库
            new_book = Book.objects.create(**serilaizer.validated_data)
            return Response(serilaizer.data)
        else:
            return Response(serilaizer.errors)
```

