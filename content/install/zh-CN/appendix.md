## 附录

### 附录1：pip 源配置说明

> 如果使用国内网络环境，pip 下载速度可能受限，可按如下方法配置国内 pip 源

```
$ mkdir ~/.pip
```

```
$ cat > ~/.pip/pip.conf << EOF
[global]
trusted-host=mirrors.aliyun.com
index-url=https://mirrors.aliyun.com/pypi/simple/
EOF
```

### 附录2：离线部署说明

1. 下载安装包以及离线部署 Repos
2. 解压安装包，并将 Repos 解压后拷贝到安装包中的 Repos 目录下
3. 执行 installer 初始化脚本: scripts/InitInstaller.sh，安装 installer 相关依赖软件。
4. 修改配置文件，同在线安装。
5. 执行部署

```
$ scripts/install.sh
```
