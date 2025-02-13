drf 常用组件，实现常用功能

参考官网API地址：  https://www.django-rest-framework.org/api-guide/filtering/

#### drf过滤

安装django-filter

```python
pip install django-filter
```

添加到 APP：

```python
INSTALLED_APPS = [
    ...
    'django_filters',
    ...
]
```

设置REST_FRAMEWORK，指定`filter backend` (全局)

```python
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}
```

局部设置方式：在`viewset`中指定：

```python
from django_filters.rest_framework import DjangoFilterBackend
class xxx(generics.ListAPIView):
    ...
    filter_backends = [DjangoFilterBackend]
```

在对应视图下添加`filterset_fields`

```python
class BookView(viewsets.ModelViewSet):
    ...
    filterset_fields = ['title', 'price']
```

验证URL：

```txt
http://127.0.0.1:8000/book
http://127.0.0.1:8000/book?title=book1
http://127.0.0.1:8000/book?title=book1&price=10
```



#### drf搜索

搜索针对的是`CharField`和`TextField`, 在视图添加`search_fields`

```python
from rest_framework import filters
	filter_backends = [filters.SearchFilter]
    search_fields = ['title']
```

验证方式:

```txt
http://127.0.0.1:8000/book?search=book1
```



#### drf分页

参考官网链接： https://www.django-rest-framework.org/api-guide/pagination/

自定义分页：

1. 继承`pagination.BasePagination`
2. 重写`panigate` 和 `get_paginated_response`方法

```python
# utils.custom_pagination.py

from rest_framework import pagination
from rest_framework.response import Response

class CustomPagination(pagination.PageNumberPagination):
    # 指定变量
    page_size_query_param = "page_size"
    max_page_size = 100
    
    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })
```



添加settings：

```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION.CLASS': 'utils.custom_pagination.CustomPagination',
    'PAGE_SIZE': 10 # 默认page_size大小
}
```



#### drf认证

参考官网地址：https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication

用于登录验证实现， 基于TokenAuthentication

1 安装APP

```python
INSTALLED_APPS = [
    ...
    'rest_framework.authtoken'
]
```

创建获取token视图，继承`ObtainAuthToken`

```python
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
```

加入到urls：

```python
urlpatterns += [
    path('api-token-auth/', CustomAuthToken.as_view())
]
```

