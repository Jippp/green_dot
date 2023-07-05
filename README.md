## 关于安装的报错

### Windows

直接按照官方的文档安装即可：https://github.com/Automattic/node-canvas/wiki/Installation:-Windows

### Centos7

官方给的文档是https://github.com/Automattic/node-canvas/wiki/Installation:-Fedora-and-other-RPM-based-distributions

但是实际并不行，会报一些`node-pre-gyp`的错误。

所以结合上述Windows的文档来看，应该是还要安装`node-gyp`这个包的，文档：https://github.com/nodejs/node-gyp

> 这个node-gyp是node一个跨平台的，主要作用就是模拟底层的一些接口进行跨平台使用。
>
> - 用到了Python，所以需要安装python：从官网安装即可，网络上相关安装博客。
>
> ```bash
> # 从官网下载Python安装包
> wget https://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz
> # 移动安装包的位置、解压、配置安装目录、编译源码、执行源码安装
> mv Python-3.7.4.tgz /usr/local/
> mkdir /usr/local/python3
> cd /usr/local/
> tar -xvf Python-3.7.4.tgz
> ./configure --prefix=/usr/local/python3
> make
> make install
> ```
>
> > 执行make install时可能会报错`No module named "_ctypes"`：缺少依赖`libffi-devel`
> >
> > ```bash
> > yum -y install libffi-devel
> > make
> > make altinstall
> > ```
>
> - 用到了C++，所有还有有GCC这类的C++编译器，Centos7默认是有GCC的，但是可能版本有问题，我这里更新到了8.2.0
>
> ```bash
> # 安装相关的依赖包
> yum install libmpc-devel mpfr-devel gmp-devel
> # 下载GCC源码 解压 进入文件夹 配置编译目录 编译 安装
> wget https://ftp.gnu.org/gnu/gcc/gcc-8.2.0/gcc-8.2.0.tar.gz
> tar xvf gcc-8.2.0.tar.gz & cd gcc-8.2.0
> ./configure
> make
> sudo make install
> 
> # 执行gcc -v进行验证
> ```

### MacOS

https://github.com/Automattic/node-canvas/wiki/Installation%3A-Mac-OS-X#from-source
这部分从源码安装可以成功