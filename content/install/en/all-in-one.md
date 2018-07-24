##  All-in-one Mode


**`All-in-one`** mode means single node deployment,  can be deployed to a single system for a test or development environment only, it is just recommended to get familiar with installation process or learn about KubeSphere features by following with All-in-one mode, which means it can help you to get KubeSphere platform up and running to try out for the first time.  All-in-one mode is not considered a production environment. For production environment, it is recommended to select **`Multi-node`** instead.

### Step 1: Provision Linux Host

#### Prerequisites

The following section identifies the hardware specifications and system-level requirements of one host within KubeSphere platform environment. To get started with All-in-one mode, you may need to prepare only one host refer to the following specification.

#### Hardware Recommendations

| System | Minimum Requirements |  Recommendations |
| --- | --- | --- |
| ubuntu 16.04 LTS 64bit | CPU：8 Core <br/> Memory：12G <br/> Disk Space：40G | CPU：16 Core <br/> Memory：32G <br/> Disk Space：100G |


All components of the platform are distributed and installed from the same host, taking 192.168.0.10 as an example.

| **Host IP** | **Roles** |
| --- | --- |
| **192.168.0.10** | **master , node , etcd** |



###  Step 2: Provision Installation Files

**1.**  **KubeSphere** official download address：

[KubeSphere Installer download](https://drive.yunify.com/s/jV8QSnO8KkWLu4V) （To be updated）

**Note：**  <br/>

> If you can not connect to network, please refer to [Disconnected Installation Instructions](#disconnected-installation-instructions-to-be-defined)

**2.**  When you get the installation package, please execute following commands to unzip the package.

```
  $ tar -zxvf kubesphere-all-express-1.0.alpha.tar.gz
```

**3.** Go into “`kubesphere-express-1.0.alpha`” folder

```
  $ cd kubesphere-express-1.0.alpha
```

**Reminder：**  <br/>
> If you would like to customize the configuration parameters, such as network, storage classes, etc. You will be able to specify the parameters in  **`vars.yml`** via Vim.

```
  $ vi conf/vars.yml
```
**Note：**  <br/>

> - You will be able to modify the relevant configurations like network or storage classes, otherwise it will be executed with default parameters without any modifications**

> - Network：KubeSphere supports `calico` by default**

> - Supported Storage Classes：`GlusterFS、CephRBD、local\_volume(Default)`. For details on storage configuration, please refer to [Storage Configuration Instructions](#storage-configuration-instructions)

> - All-in-One uses local storage as the storage class by default. Since local storage does not support dynamic provisioning, users may need to create a persistent volume (PV) in advance when creating volumes in the KubeSphere console.
 


###  Step 3: Get Started With Deployment

The environment and file monitoring, dependent software installation of KubeSphere, automated installation of Kubernetes and etcd, and automated storage configuration, all of these procedures will be automatically processing in this deployment.

The KubeSphere installation package will automatically install the relevant dependent software as following table described.

#### Software Recommendations

| **Dependent Software** | **Supported Version** |
| --- | --- |
| Ansible | v2.4 (or newer) |
| Python-netaddr | v0.7.18(or newer) |
| Jinja | v2.9 (or newer) |


Following section describes how to get started with All-in-one mode deployment.

> The current system is Ubuntu 16.04. It is recommended to use ubuntu as default user to complete following steps.

**1.** Go into `scripts`(If current location is in kubesphereinstaller)

```
$ cd scripts
```

**2.** Execute **`install.sh`**：

```
$ ./install.sh
```

**3.** Enter`1` to select `All-in-one` mode to start：
```
##################################################
KubeSphere Installer Menu
##################################################
*  1）All-in-one
*  2）Multi-node
*  3）Quit
##################################################
Https://kubesphere.io/                  2018-07-27
##################################################
Please Select An Option: 
```

**Attention：** <br/>

> If any errors occur, you can check according to the error message, please give us feedback as well.


**4.** Test **KubeSphere** All-in-one mode Deployment：

**(1).**If you can see the following "Successful" result being returned after `install.sh` completed, that means KubuSphere installation is ready.

```
Play Rep  ****************************************
KubeSphere   : ok=69 changed=68 unreachable=0 
failed=0
Succesful!
##################################################
KubeSphere is running！
Matser IP: 121.10.121.111
Ks-console-nodeport: 32117
Ks-apiserver-nodeport 32002
##################################################
```

**(2).**Then you will be able to access KubeSphere login page with the IP address of the host and correct port. The port number will be automatically generated in the result page as above screenshot showing "ks-console-nodeport:32117". <br/>
**Example**： [http://139.198.121.143:31413](http://139.198.121.143:31413)
<br/>
![](/pic02.png)

###  Summary
When KubeSphere is deployed successfully ，you will be able to follow with [*"<u>KubeSphere User Guide</u>"*](www.qingcloud.com)，then log in to KubeSphere and learn how to get started with it！
