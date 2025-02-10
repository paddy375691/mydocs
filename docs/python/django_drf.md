### 快速掌握django restframework

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



#### DRF_ APIView源码分析

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



##### 补充save()操作解析

- 使用序列化器的save操作，将添加数据和验证逻辑  解耦出来

![image-20250210192422340](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250210192422340.png)



所以上面Post的代码，可以改成这样：

```python
class BookSerializers(serializers.Serializer):
    ...
    def create(self, validated_data):
        # 重写create方法
        return Book.objects.create(**validated_data)

# views.py
def post(self, request):
	serilaizer = BookSerializers(data=request.data)  
	if serilaizer.is_valid():  
		serilaizer.save()  # 替换为save操作
		return Response(serilaizer.data)
	else:
		return Response(serilaizer.errors)
```



对单个Book明细类 BookDetail的三个接口, 查询/修改/删除

```python
class BookSerializers(serializers.Serializer):
    ...
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.price = validated_data.get('price', instance.price)
        instance.pub_date = validated_data.get('pub_date', instance.pub_date)
        instance.save()
        return instance

# views.py
class BookDetailView(APIView):
    def get(self, request, id):
        book = Book.objects.get(pk=id)
        serializer = BookSerializers(instance=book, many=False)
        return Response(serializer.data)

    def put(self, request, id):
        book = Book.objects.get(pk=id)
        # 对于修改单条数据，需要传instance和data
        serilaizer = BookSerializers(instance=book, data=request.data)
        if serilaizer.is_valid():
            """
            # 手写逻辑
            Book.objects.filter(pk=id).update(**serilaizer.validated_data)  # 更新
            serilaizer.instance = Book.objects.get(pk=id)  # 拿到更新后的数据
            """
            # 使用save, 重写update
            serilaizer.save()
            return Response(serilaizer.data)
        else:
            return Response(serilaizer.errors)

    def delete(self, request, id):
        Book.objects.get(pk=id).delete()
        return Response("")
```



##### 使用ModelSerializer

当前已经通过Serializer + APIView实现了接口，现改为使用ModelSerializer，做了哪些改动

- 根据model表自动创建字段，并且实现好了create和update. 通过源码查看就可以
- 缺点是： 和模型耦合

```python
class BookSerializers(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
```

#### 视图(核心)

##### GenericAPIView

- 继承自APIView， 扩展了一些新的特性，进一步封装
- 目标是将上面APIView的代码中变量抽取出来

![image-20250210195503044](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250210195503044.png)

接下来，使用GenericAPIView 改写：

```python
class BookView(GenericAPIView):
    """
    直接配置模型和序列化器
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializers

    def get(self, request):
        serializer = self.get_serializer(instance=self.get_queryset(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serilaizer = self.get_serializer(data=request.data)  # 反序列化传data
        if serilaizer.is_valid():
            serilaizer.save()
            return Response(serilaizer.data)
        else:
            return Response(serilaizer.errors)
```

对于BookDetailView，由于 get_object 是具名路由，这里做一点改造： 

![image-20250210225949286](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250210225949286.png)

![image-20250210200046042](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250210200046042.png)



这里根据urls改造：

```python
# urls.py
    re_path("book/(?P<pk>\d+)", BookDetailView.as_view())
```

```python
# views.py
class BookDetailView(GenericAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializers

    def get(self, request, pk):
        serializer = self.get_serializer(instance=self.get_object(), many=False)
        return Response(serializer.data)

    def put(self, request, pk):
        # 对于修改单条数据，需要传instance和data
        serilaizer = self.get_serializer(instance=self.get_object(), data=request.data)
        if serilaizer.is_valid():
            """
            # 手写逻辑
            Book.objects.filter(pk=id).update(**serilaizer.validated_data)  # 更新
            serilaizer.instance = Book.objects.get(pk=id)  # 拿到更新后的数据
            """
            # 使用save, 重写update
            serilaizer.save()
            return Response(serilaizer.data)
        else:
            return Response(serilaizer.errors)

    def delete(self, request, pk):
        self.get_object().delete()
        return Response("")
```



##### 混合 mixins

对于上述的代码，还有以下问题：

- 重复度很高，不够简洁，继续进行封装
- 引入mixins.  List, Create, Retrive, Update, Destroy.  分别对应增删改查查，继续简化代码
- 可以在对应源码中看见，mixins这些类，依赖GenericAPIView的get_serilaizer等方法，所以需要进行**多继承**实现

```python
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
class BookView(GenericAPIView, ListModelMixin, CreateModelMixin):
    """
    直接配置模型和序列化器
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializers
    def get(self, request):
        return self.list(request)
    def post(self, request):
        return self.create(request)

class BookDetailView(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Book.objects.all()
    serializer_class = BookSerializers
    def get(self, request, pk):
        return self.retrieve(request, pk)
    def put(self, request, pk):
        return self.update(request, pk)
    def delete(self, request, pk):
        return self.destroy(request, pk)
```

##### mixins 再封装

- 继续简化代码，省略对应CBV中的函数 get  post等

```python
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
class BookView(ListCreateAPIView):
    """
    直接配置模型和序列化器
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializers

class BookDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializers
```



##### 使用ViewSet

当前问题：

- 对于一个资源模型Book，需要写两个类 BookView, 和 BookDetailView
- 原因是： 路由分发的时候，同一个get不能对应在一个类里面，必须分开在两个类
- viewset就是解决这个问题，通过对as_view的重写，对路由分发进行映射，可以映射到指定的方法中



![image-20250210202829635](C:/Users/37569/AppData/Roaming/Typora/typora-user-images/image-20250210202829635.png)

```python
# views.py
class BookView(viewsets.ViewSet):
    def get_all(self, request):
        return Response("获取所有数据")

    def add_one(self, request):
        return Response("添加一个数据")

    def get_one(self, request, pk):
        return Response("获取单行数据")

    def modify_one(self, request, pk):
        return Response("修改一条数据")

    def delete_one(self, request, pk):
        return Response("删除一条数据")

# urls.py
urlpatterns += [
    path('book/', BookView.as_view({
        "get": "get_all",
        "post": "add_one"
    })),
    re_path("book/(?P<pk>\d+)", BookView.as_view({
        "get": "get_one",
        "put": "modify_one",
        "delete": "delete_one"
    }))
]
```

![image-20250210203204281](https://markdown-demo.obs.cn-east-3.myhuaweicloud.com/image-20250210203204281.png)

##### 使用ModelViewSet

ViewSet解决的是 路由映射的问题，但是无法用到GenericAPIView那些封装好的特性

现在：使用GenericViewSet (继承自genericAPIView和ViewSetMixin)  同时发挥以上特性，将所有性能封装起来

```python
# views.py
class BookView(viewsets.GenericViewSet,
               ListModelMixin,
               CreateModelMixin,
               RetrieveModelMixin,
               UpdateModelMixin,
               DestroyModelMixin):
    queryset = Book.objects.all()
    serializer_class = BookSerializers

    def get_all(self, request):
        return self.list(request)

    def add_one(self, request):
        return self.create(request)

    def get_one(self, request, pk):
        return self.retrieve(request, pk)

    def modify_one(self, request, pk):
        return self.update(request, pk)

    def delete_one(self, request, pk):
        return self.destroy(request, pk)
```

> 以上：能发现ModelViewSet实际就是所有的集合

```python
class ModelViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    """
```















