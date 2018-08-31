##  All-in-One Mode


`All-in-One` mode means single node deployment, can be deployed to a single host for a test or development environment only. It's just recommended to get familiar with installation process or learn about KubeSphere features by following with all-in-one mode installation, which means it can help you to get KubeSphere platform up and running to try out for the first time.  All-in-one mode is not considered a production environment. For formal environment, it‘s recommended to select `multi-node` instead.


### Step 1: Provision Linux Host

#### Prerequisites

The following section identifies the hardware specifications and system-level requirements of one host within KubeSphere platform environment. To get started with all-in-one mode, you may need to prepare only one host refer to the following specification.

#### Hardware Recommendations

| System | Minimum Requirements |  Recommendations |
| --- | --- | --- |
| ubuntu 16.04 LTS 64bit | CPU：8 Core <br/> Memory：12G <br/> Disk Space：40G | CPU：16 Core <br/> Memory：32G <br/> Disk Space：100G |
| CentOS 7.4 64bit | CPU：8 Core <br/> Memory：12G <br/> Disk Space：40G | CPU：16 Core <br/> Memory：32G <br/> Disk Space：100G |


###  Step 2: Provision Installation Files

**1.**  Download <a href="https://kubesphere.io/download/" target="_blank">KubeSphere Installer</a>, you will be able to download installer via command like `curl -O url` or `wget url`, actually the url is the download link.

|KubeSphere Version|Operation System（More OS will coming soon）|
|--------------|-------|
|Dev |Ubuntu 16.04 LTS 64bit， <br> CentOS 7.4 64bit| 
|Stable (Alpha )|Ubuntu 16.04 LTS 64bit| 
|Offline |Ubuntu 16.04.4 LTS 64bit，<br> Ubuntu 16.04.5 LTS 64bit|

**2.**  When you get the installation package, please execute following command to unzip the package. Here showing an example with Alpha installer as following, the installer name should be replaced with download version.

```
  $ tar -zxvf kubesphere-all-express-1.0.0-alpha.tar.gz
```

**3.** Go into “`kubesphere-all-express-1.0.0-alpha`” folder

```
  $ cd kubesphere-all-express-1.0.0-alpha
```


###  Step 3: Get Started With Deployment



The environment and file monitoring, dependent software installation of KubeSphere, automated installation of Kubernetes and etcd, and automated storage configuration, all of these procedures will be automatically processing in this deployment. The KubeSphere installation package will automatically install the relevant dependent software like Ansible (v2.4+)，Python-netaddr (v0.7.18+) and Jinja (v2.9+).

**Note:**

> - Generally, you can install it directly without any modification.

> - If you would like to customize the configuration parameters, such as network, storage classes, etc. You will be able to specify the parameters in  `vars.yml`. Otherwise it will be executed with default parameters without any modifications.

> - Network：KubeSphere supports `calico` by default.

> - Supported Storage Classes：`local\_volume(Default), QingCloud CSI, GlusterFS, CephRBD`. For details regarding storage configuration, please refer to <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#存储配置说明" target="_blank">Storage Configuration Instructions</a>

> - All-in-One uses local storage as the storage class by default. Since local storage does not support dynamic provisioning, users may need to create a persistent volume (PV) in advance when creating volumes in the KubeSphere console, installer pre-creates 8 available 10G PVs for testing.




Following steps describes how to get started with all-in-one:

**1.** Go into `scripts`

```
$ cd scripts
```

**2.** Execute `install.sh`：

```
$ ./install.sh
```

**3.** Enter`1` to select `all-in-one` mode to start：

```
################################################
         KubeSphere Installer Menu
################################################
*   1) All-in-one
*   2) Multi-node
*   3) Quit
################################################
https://kubesphere.io/               2018-07-27
################################################
Please input an option: 1

```


**4.** Test KubeSphere all-in-one mode Deployment：

**(1).**If you can see the following "Successful" result being returned after `install.sh` completed, that means KubuSphere installation is ready.

```
PLAY RECAP ***************************************
KubeSphere     : ok=69 changed=68 unreachable=0 
failed=0
Succesful!
##################################################
KubeSphere is running！
Matser IP: 121.10.121.111
ks-console-nodeport: 32117
ks-apiserver-nodeport: 32002
##################################################
```

**(2).**Then you will be able to access KubeSphere login page with the IP address of the host and correct port. The port number will be automatically generated in the result page as above screenshot showing "ks-console-nodeport. Then you will be able to access the KubeSphere web via EIP and port forwarding. **Example**： [http://139.198.121.143:8080](http://139.198.121.143:8080)
<br/>

![](/pic02.png)

###  Summary
When KubeSphere is deployed successfully ，you will be able to use following account and password to log in to the KubeSphere console to experience.

> Account: admin@kubesphere.io 

> Password: passw0rd

For details, please refer to <a href="https://docs.kubesphere.io/express/zh-CN/user-case/" target="_blank">KubeSphere User Guide</a>， and learn how to get started with it！

