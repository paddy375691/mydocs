import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.504067c4.js";const h=JSON.parse('{"title":"Nginx 基础","description":"","frontmatter":{},"headers":[],"relativePath":"middleware/nginx/index.md","filePath":"middleware/nginx/index.md"}'),p={name:"middleware/nginx/index.md"},o=l(`<h1 id="nginx-基础" tabindex="-1">Nginx 基础 <a class="header-anchor" href="#nginx-基础" aria-label="Permalink to &quot;Nginx 基础&quot;">​</a></h1><h2 id="正向代理和反向代理" tabindex="-1">正向代理和反向代理 <a class="header-anchor" href="#正向代理和反向代理" aria-label="Permalink to &quot;正向代理和反向代理&quot;">​</a></h2><h3 id="正向代理" tabindex="-1">正向代理： <a class="header-anchor" href="#正向代理" aria-label="Permalink to &quot;正向代理：&quot;">​</a></h3><ul><li>客户端和目标服务器之间的服务器，客户端向代理发送一个请求指定目标服务器，由代理返回内容给客户端。平时说的代理都是正向代理</li><li>核心：用户知道自己访问的目标</li><li>比如，跳板机，访问国外站点</li></ul><h3 id="反向代理" tabindex="-1">反向代理： <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理：&quot;">​</a></h3><ul><li>客户端向代理发送一个请求，代理向目标服务器请求并返回。代理会隐藏真实服务器地址</li><li>客户不知道代理后面的真实服务器</li><li>比如访问域名 huawei.com，代理后面的目标服务器并不知道</li></ul><h2 id="nginx快速安装" tabindex="-1">Nginx快速安装 <a class="header-anchor" href="#nginx快速安装" aria-label="Permalink to &quot;Nginx快速安装&quot;">​</a></h2><p>安装步骤</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 1. 下载安装包地址 http://nginx.org/en/download.html</span></span>
<span class="line"><span style="color:#6A737D;"># 2. 安装依赖</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gcc</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zlib</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zlib-devel</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pcre-devel</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openssl-deve</span></span>
<span class="line"><span style="color:#6A737D;"># 3. 上传软件</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/software/</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/software/</span></span>
<span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-zxvf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx-1.18.0.tar.gz</span></span>
<span class="line"><span style="color:#6A737D;"># 4. 编译安装</span></span>
<span class="line"><span style="color:#B392F0;">./configure</span></span>
<span class="line"><span style="color:#B392F0;">make</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">make</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 1. 下载安装包地址 http://nginx.org/en/download.html</span></span>
<span class="line"><span style="color:#6A737D;"># 2. 安装依赖</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gcc</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zlib</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zlib-devel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pcre-devel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openssl-deve</span></span>
<span class="line"><span style="color:#6A737D;"># 3. 上传软件</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/software/</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/software/</span></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-zxvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx-1.18.0.tar.gz</span></span>
<span class="line"><span style="color:#6A737D;"># 4. 编译安装</span></span>
<span class="line"><span style="color:#6F42C1;">./configure</span></span>
<span class="line"><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span></span></code></pre></div><p>默认安装路径</p><ul><li>/usr/local/nginx 访问</li></ul><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#B392F0;">./nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#6F42C1;">./nginx</span></span></code></pre></div><h2 id="核心目录和基础命令" tabindex="-1">核心目录和基础命令 <a class="header-anchor" href="#核心目录和基础命令" aria-label="Permalink to &quot;核心目录和基础命令&quot;">​</a></h2><p>核心目录</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">conf</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 所有配置文件目录</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">nginx.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 默认主配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 编译安装时Nginx的默认站点目录</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">50x.html</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 错误页面</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">index.html</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 默认首页</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">logs</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 默认日志路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">error.log</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 错误日志</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">nignx.pid</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 启动后进程id</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">access.log</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># nginx访问日志</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">sbin</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># nginx 命令目录</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 启动命令</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">conf</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 所有配置文件目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">nginx.conf</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 默认主配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">html</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 编译安装时Nginx的默认站点目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">50x.html</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 错误页面</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">index.html</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 默认首页</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">logs</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 默认日志路径</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">error.log</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 错误日志</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">nignx.pid</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 启动后进程id</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">access.log</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># nginx访问日志</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">sbin</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># nginx 命令目录</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">nginx</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 启动命令</span></span></code></pre></div><p>基础命令</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">./nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 默认配置启动</span></span>
<span class="line"><span style="color:#B392F0;">./nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-s</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">relaod</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 热加载配置文件</span></span>
<span class="line"><span style="color:#B392F0;">./nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/nginx/conf/nginx.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 指定配置文件启动</span></span>
<span class="line"><span style="color:#B392F0;">./nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-s</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 停止</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ef</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 干掉主进程也能停nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">./nginx</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 默认配置启动</span></span>
<span class="line"><span style="color:#6F42C1;">./nginx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-s</span><span style="color:#24292E;"> </span><span style="color:#032F62;">relaod</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 热加载配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">./nginx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/conf/nginx.conf</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 指定配置文件启动</span></span>
<span class="line"><span style="color:#6F42C1;">./nginx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-s</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 停止</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ef</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 干掉主进程也能停nginx</span></span></code></pre></div><h2 id="核心配置文件解读" tabindex="-1">核心配置文件解读 <a class="header-anchor" href="#核心配置文件解读" aria-label="Permalink to &quot;核心配置文件解读&quot;">​</a></h2><p>nginx.conf</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost conf]# cat nginx.conf</span></span>
<span class="line"><span style="color:#6A737D;">#user  nobody;</span></span>
<span class="line"><span style="color:#B392F0;">worker_processes</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#error_log  logs/error.log;</span></span>
<span class="line"><span style="color:#6A737D;">#error_log  logs/error.log  notice;</span></span>
<span class="line"><span style="color:#6A737D;">#error_log  logs/error.log  info;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#pid        logs/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">events</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">worker_connections</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 定义Nginx每个进程的最大连接 worker_connections * worker_processes . </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 对于反向代理服务器，前后端都会建立连接，需要除以2</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">mime.types</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">default_type</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">application/octet-stream</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 定义日志模板</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">   	</span><span style="color:#6A737D;"># 日志路径和使用的日志模板</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#access_log  logs/access.log  main;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">sendfile</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;"># 开启高效传输</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#tcp_nopush     on;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#keepalive_timeout  0;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">keepalive_timeout</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">65</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;"># 客户端保持活跃的超时时间</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#gzip  on;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 虚拟主机配置	</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;"># 虚拟主机的服务端口</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">localhost</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;"># 指定IP和域名，多个域名之间空格隔开</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">#charset koi8-r;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">#access_log  logs/host.access.log  main;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># URL 地址配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">root</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">index.html</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.htm</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">#error_page  404              /404.html;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">error_page</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">502</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">503</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">504</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/50x.html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/50x.html</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">root</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost conf]# cat nginx.conf</span></span>
<span class="line"><span style="color:#6A737D;">#user  nobody;</span></span>
<span class="line"><span style="color:#6F42C1;">worker_processes</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#error_log  logs/error.log;</span></span>
<span class="line"><span style="color:#6A737D;">#error_log  logs/error.log  notice;</span></span>
<span class="line"><span style="color:#6A737D;">#error_log  logs/error.log  info;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#pid        logs/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">events</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">worker_connections</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 定义Nginx每个进程的最大连接 worker_connections * worker_processes . </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 对于反向代理服务器，前后端都会建立连接，需要除以2</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">include</span><span style="color:#24292E;">       </span><span style="color:#032F62;">mime.types</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">default_type</span><span style="color:#24292E;">  </span><span style="color:#032F62;">application/octet-stream</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 定义日志模板</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">   	</span><span style="color:#6A737D;"># 日志路径和使用的日志模板</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#access_log  logs/access.log  main;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">sendfile</span><span style="color:#24292E;">        </span><span style="color:#032F62;">on</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 开启高效传输</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#tcp_nopush     on;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#keepalive_timeout  0;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">keepalive_timeout</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">65</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 客户端保持活跃的超时时间</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#gzip  on;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 虚拟主机配置	</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">       </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 虚拟主机的服务端口</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;">  </span><span style="color:#032F62;">localhost</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># 指定IP和域名，多个域名之间空格隔开</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">#charset koi8-r;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">#access_log  logs/host.access.log  main;</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># URL 地址配置</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;">   </span><span style="color:#032F62;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;">  </span><span style="color:#032F62;">index.html</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.htm</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">#error_page  404              /404.html;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">error_page</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">500</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">502</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">503</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">504</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/50x.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/50x.html</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;">   </span><span style="color:#032F62;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="【案例】前端静态服务器" tabindex="-1">【案例】前端静态服务器 <a class="header-anchor" href="#【案例】前端静态服务器" aria-label="Permalink to &quot;【案例】前端静态服务器&quot;">​</a></h2><h4 id="虚拟主机-搭建前端静态资源服务器" tabindex="-1">虚拟主机，搭建前端静态资源服务器 <a class="header-anchor" href="#虚拟主机-搭建前端静态资源服务器" aria-label="Permalink to &quot;虚拟主机，搭建前端静态资源服务器&quot;">​</a></h4><ul><li><p>一台服务器划分多个磁盘空间，每个磁盘空间都是一个虚拟主机，每个虚拟主机对外提供服务，互不干扰</p></li><li><p>利用虚拟主机把多个不同的域名的网站部署在同一台服务器上，节省成本</p></li></ul><p>开始案例：</p><p>例如有两个域名，aabbcc.com, aabbccdd.com</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 虚拟主机配置, 同一个http下，有2个server, 这里演示核心配置</span></span>
<span class="line"><span style="color:#6A737D;"># 本地测试时修改hosts文件进行测试</span></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">aabbcc.com</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/nginx/html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">xdcaabbcclass.html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">aabbccdd.com</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">aabbccdd.html</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.htm</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试结果：</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost logs]# curl http://aabbcc.com</span></span>
<span class="line"><span style="color:#B392F0;">aabbcc</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost logs]# curl http://aabbccdd.com</span></span>
<span class="line"><span style="color:#B392F0;">aabbccdd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 虚拟主机配置, 同一个http下，有2个server, 这里演示核心配置</span></span>
<span class="line"><span style="color:#6A737D;"># 本地测试时修改hosts文件进行测试</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">aabbcc.com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xdcaabbcclass.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">aabbccdd.com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;"> </span><span style="color:#032F62;">aabbccdd.html</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.htm</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试结果：</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost logs]# curl http://aabbcc.com</span></span>
<span class="line"><span style="color:#6F42C1;">aabbcc</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost logs]# curl http://aabbccdd.com</span></span>
<span class="line"><span style="color:#6F42C1;">aabbccdd</span></span></code></pre></div><h2 id="【案例】图片服务器" tabindex="-1">【案例】图片服务器 <a class="header-anchor" href="#【案例】图片服务器" aria-label="Permalink to &quot;【案例】图片服务器&quot;">​</a></h2><p>常见的文件上传流程</p><ul><li>前端提交图片 -&gt; 后端处理 -&gt; 存储到图片服务器 -&gt; 拼接好访问路径到存储到数据库和返回前端</li></ul><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 文件（图片）服务器</span></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">aabbcc.com</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/app/img</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">alias</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/software/img/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># windows 访问地址, 提前在目录下准备png文件</span></span>
<span class="line"><span style="color:#B392F0;">http://aabbcc.com/app/img/test.png</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 文件（图片）服务器</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">aabbcc.com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/app/img</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">alias</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/software/img/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># windows 访问地址, 提前在目录下准备png文件</span></span>
<span class="line"><span style="color:#6F42C1;">http://aabbcc.com/app/img/test.png</span></span></code></pre></div><h2 id="access-log-分析" tabindex="-1">access log 分析 <a class="header-anchor" href="#access-log-分析" aria-label="Permalink to &quot;access log 分析&quot;">​</a></h2><h4 id="access-log-的一些用处" tabindex="-1">access log 的一些用处 <a class="header-anchor" href="#access-log-的一些用处" aria-label="Permalink to &quot;access log 的一些用处&quot;">​</a></h4><ul><li>统计站点访问ip来源，某个时间段访问频率</li><li>访问最频繁的页面、响应码、性能接口</li><li>接口秒级访问量、分钟级、天级等</li></ul><blockquote><p>将access log 收集到Kafka或者ElasticSearch，可以很方便地自定义做统计。可以查看EFK相关文档</p></blockquote><h4 id="数据字典信息" tabindex="-1">数据字典信息 <a class="header-anchor" href="#数据字典信息" aria-label="Permalink to &quot;数据字典信息&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">  #log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">  #log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">    #                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">    #                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span></code></pre></div><table><thead><tr><th style="text-align:center;">变量</th><th style="text-align:center;">含义</th></tr></thead><tbody><tr><td style="text-align:center;">$remote_addr</td><td style="text-align:center;">客户端IP, 如果有代理时，则是代理的IP</td></tr><tr><td style="text-align:center;">$remote_user</td><td style="text-align:center;">远程用户，默认则为&#39;-&#39;</td></tr><tr><td style="text-align:center;">[$time_local]</td><td style="text-align:center;">时间</td></tr><tr><td style="text-align:center;">$request</td><td style="text-align:center;">对应请求接口</td></tr><tr><td style="text-align:center;">$status</td><td style="text-align:center;">状态码</td></tr><tr><td style="text-align:center;">$body_bytes_sent</td><td style="text-align:center;">响应body大小</td></tr><tr><td style="text-align:center;">$http_referer</td><td style="text-align:center;">head的一部分， 链接到当前页面的前一页面的 URL 地址</td></tr><tr><td style="text-align:center;">$http_user_agent</td><td style="text-align:center;">用户代理 一般是浏览器驱动</td></tr><tr><td style="text-align:center;">$http_x_forwarded_for</td><td style="text-align:center;">客户端的真实IP，区别于$remote_addr</td></tr></tbody></table><h2 id="【案例】常见access-log统计需求" tabindex="-1">【案例】常见access log统计需求 <a class="header-anchor" href="#【案例】常见access-log统计需求" aria-label="Permalink to &quot;【案例】常见access log统计需求&quot;">​</a></h2><h4 id="这里用shell简单实现" tabindex="-1">这里用shell简单实现 <a class="header-anchor" href="#这里用shell简单实现" aria-label="Permalink to &quot;这里用shell简单实现&quot;">​</a></h4>`,39),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{h as __pageData,g as default};
