##  Multi-Node Mode

`Multi-Node` mode means multiple nodes deployment, for example, single or multiple `master(s)`, multiple `nodes`, single or multiple  `etcd` node(s). it's recommended to prepare at least `2` nodes and deploy to normal environment. Typically, select any one host in the cluster being served as a role of "`taskbox`" to execute installation task for other hosts before multi-node deployment,  "`SSH Communication`" is required to be established between "taskbox" and other hosts.


### Step 1: Provision Linux Host

#### Prerequisites

The following section identifies the hardware specifications and system-level requirements of hosts within KubeSphere platform environment. To get started with multi-node mode, you may need to prepare at least `2` hosts refer to the following specification.

#### Hardware Recommendations


| Operating System | Minimum Requirements |  Recommendations |
| --- | --- | --- |
| ubuntu 16.04 LTS 64bit | CPU：8 Core <br/> Memory：12 G <br/> Disk Space：40 G | CPU：16 Core <br/> Memory：32 G <br/> Disk Space：100 G |
| CentOS 7.4 64bit | CPU：8 Core <br/> Memory：12G <br/> Disk Space：40G | CPU：16 Core <br/> Memory：32G <br/> Disk Space：100G |


The following section describes an example to introduce multi-node mode deployment. This example prepares 3 hosts, with the host name "master" serve as the taskbox, and the host name of each node can be customized by the user. Assume that the host information as following table showing:

| Host IP | Host Name | Role |
| --- | --- | --- |
|192.168.0.10|master|master, etcd, node|
|192.168.0.20|node1|node|
|192.168.0.30|node2|node|



#### Cluster Architecture

Single master, Single etcd, Multiple nodes

![Architecture](/pic04_en.svg)



**Note:**  <br/>

> etcd is a distributed key value store that provides a reliable way to store data across a cluster of machines. The number of etcd node is required at least one. For high availability, it is recommended to deploy multiple etcd nodes, which can makes the Kubernetes cluster more reliable. The number of etcd nodes is recommended to be set to `odd number`. KubeSphere Express Edition just temporarily supports single etcd, we are going to support multiple etcd in the next Advanced Edition soon.


###  Step 2: Provision Installation Files


**1.**  Download <a href="https://kubesphere.io/download/" target="_blank">KubeSphere Installer</a>, you will be able to download installer via command like `curl -O url` or `wget url`, actually the url is the download link.

|KubeSphere Version|Operation System（More OS will coming soon）|
|--------------|-------|
|Dev |Ubuntu 16.04 LTS 64bit， <br> CentOS 7.4 64bit| 
|Stable (Alpha )|Ubuntu 16.04 LTS 64bit| 
|Offline |Ubuntu 16.04.4 LTS 64bit，<br> Ubuntu 16.04.5 LTS 64bit|

**2.**  When you get the installation package, please execute following command to unzip the package. Here showing an example with Alpha version as following, the installer name should be replaced with downloaded version.

```bash
$ tar -zxvf kubesphere-all-express-1.0.0-alpha.tar.gz
```

**3.** Go into “`kubesphere-all-express-1.0.0-alpha`” folder.

```bash
$ cd kubesphere-all-express-1.0.0-alpha
```


**4.** In order to manage deployment process and target machines configuration, please refer to the following scripts to configure all hosts in `hosts.ini`, here showing an example of Alpha version in Ubuntu 16.04 with ubuntu user. Note that each host information occupies one line and cannot be wrapped manually.


**Example**

```ini
[all]
maser  ansible_connection=local local_release_dir={{ansible_env.HOME}}/releases ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node1  ansible_host=192.168.0.20 ip=192.168.0.20 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node2  ansible_host=192.168.0.30 ip=192.168.0.30 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password

[kube-master]
master

[kube-node]
master
node1
node2

[etcd]
master

[k8s-cluster:children]
kube-node
kube-master
```

**Note：** <br/>

> - Each node's parameters like Internal IP and its password needs to be modified into [all] field. In this example, since "master" served as `taskbox`, it just needs to replace "ansible_become_pass" with the current `ubuntu` password in the first line.
> - Other nodes like "node1" and "node2", for "ansible_host" and "ansible_become_pass" need to be replaced by their actual Internal IP and host password respectively in [all] field.
> - "master" is served as the taskbox which is to execute installation task for whole cluster, as well as the role of master and etcd, so "master" needs to be filled into [kube-master] and [etcd] field.
> - At the same time, for "master","node1" and "node2", they serve the role of node as well, so all of the hosts name need to be filled into [kube-node] field.
> 
> Parameters Specification:
> 
> - ansible_host: The name of the host to connect to.
> - ip: The ip of the host to connect to.
> - ansible_user: The default ssh user name to use.
> - ansible_become: Allows to force privilege escalation.
> - ansible_become_user: Allows to set the user you become through privilege escalation.
> - ansible_become_pass: Allows you to set the privilege escalation password.


- If you get Dev or Offline version, then some parameters like `ansible_host` 、 `ip` 、 `ansible_become_pass` and `ansible_ssh_pass` of `[all]` field in `conf/hosts.ini` need to be replaced with the actual environment parameters. Note that the configuration is devided into root and non-root user in `[all]` field, there is an example demonstrates the non-root user configuration in `conf/hosts.ini`. Please modify the parameters based on the actual identity.


**5.** It is required to prepare a server for storage service before multi-node deployment. Then you will need to specify the storage class parameters in  `vars.yml` . Then reference the details on storage configuration, please go to <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#存储配置说明" target="_blank">Storage Configuration Instructions</a>.


**Note：**  <br/>

> - You need to modify the relevant configurations like network or storage class, otherwise it will be executed with default parameters without any modifications.

> - Network：KubeSphere supports `calico` by default.


> - Supported Storage Classes：`QingCloud-CSI, GlusterFS, CephRBD` , for the details on storage configuration, please refer to <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#存储配置说明" target="_blank">Storage Configuration Instructions</a>.

> - Typically, you need to configure persistent storage. Since multi-node mode does not support local storage, it's recommended to modify the local storage default configuration to `false`, then configure persistent storage such as QingCloud-CSI, GlusterFS or CephRBD. [QingCloud-CSI](https://github.com/yunify/qingcloud-csi/blob/master/README.md) plugin makes users could use block storage as persistent storage provisioned by [QingCloud IAAS](https://console.qingcloud.com/login). Following example describes how to configure QingCloud-CSI (`qy_access_key_id`、`qy_secret_access_key` and `qy_zone` need to be replaced by the actual parameters).


**Example** 

```yaml
# Local volume provisioner deployment(Only all-in-one)
local_volume_provisioner_enabled: false
local_volume_provisioner_storage_class: local
local_volume_is_default_class: false


qy_csi_enabled: true
qy_csi_is_default_class: true
# Access key pair can be created in QingCloud console
qy_access_key_id: ACCESS_KEY_ID
qy_secret_access_key: ACCESS_KEY_SECRET
# Zone should be the same as Kubernetes cluster
qy_zone: ZONE
# QingCloud IaaS platform service url.
qy_host: api.qingcloud.com
qy_port: 443
qy_protocol: https
qy_uri: /iaas
qy_connection_retries: 3
qy_connection_timeout: 30
# The type of volume in QingCloud IaaS platform. 
# 0 represents high performance volume. 
# 3 respresents super high performance volume. 
# 1 or 2 represents high capacity volume depending on cluster‘s zone.
qy_type: 0
qy_maxSize: 500
qy_minSize: 10
qy_stepSize: 10
qy_fsType: ext4
```


###  Step 3: Get Started With Deployment

The environment and file monitoring, dependent software installation of KubeSphere, automated installation of Kubernetes and etcd, and automated storage configuration, all of these procedures will be automatically processing in this deployment. The KubeSphere installation package will automatically install the relevant dependent software like Ansible (v2.4+)，Python-netaddr (v0.7.18+) and Jinja (v2.9+).


> The current system is Ubuntu 16.04. It is recommended to use ubuntu as default user to complete following steps.


**1.** Go into `scripts`:

```bash
$ cd scripts
```

**2.** Execute `install.sh`：

```bash
$ ./install.sh
```

**3.** Enter `2` to select `multi-node` mode to start：

```bash
################################################
         KubeSphere Installer Menu
################################################
*   1) All-in-one
*   2) Multi-node
*   3) Quit
################################################
https://kubesphere.io/               2018-07-27
################################################
Please input an option: 2

```


**Attention：** <br/>

> - The installer will prompt you if you have configured the storage or not. If not, please enter "no", then return to the directory and continue to configure the storage, for details please refer to <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#存储配置说明" target="_blank">Storage Configuration Instructions</a>.

> -  Password-less SSH communication is necessary to be established with other nodes in the cluster. The user will be prompted to configure the password-less communication when executing the `install.sh`. Please enter "no" if not configured, then the installer will automatically configure password-less SSH communication as shown below:


```bash
######################################################################
         KubeSphere Installer Menu
######################################################################
*   1) All-in-one
*   2) Multi-node
*   3) Quit
######################################################################
https://kubesphere.io/                                      2018-07-27
######################################################################
Please input an option: 2
2
Have you configured storage parameters in conf/vars.yml yet?  (yes/no) 
yes
Password-less SSH communication is necessary，have you configured yet? 
If not, it will be created automatically. (yes/no) 
no 
Generating public/private rsa key pair.
Created directory '/home/ubuntu/.ssh'.
Your identification has been saved in /home/ubuntu/.ssh/id_rsa.
Your public key has been saved in /home/ubuntu/.ssh/id_rsa.pub.
```

**4.** To verify KubeSphere multi-node Deployment：

**(1).**If you can see the following "Successful" result being returned after `install.sh` completed, that means KubuSphere installation is ready.


```bash
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


**(2).** You'll be able to see that there are 2 nodeports generated above, on top of having a cluster-internal IP, expose the service on a port on each node of the cluster in Kubernetes. Generally the nodeport is high-order bit like 30000 ~ 32767. Then you'll be able to access the KubeSphere dashboard via `<nodeIP>:nodeport` (ks-console-nodeport). Since the Apps' common nodeport is low-order bit, you can aloso access the KubeSphere dashboard via IP and nodeport forwarding. **Example**： [http://139.198.121.143:8080](http://139.198.121.143:8080)
<br/>

![login](/pic02.png)


### Summary
When KubeSphere is deployed successfully ，you will be able to use following account and password to log in to the KubeSphere console to experience.

> Account: admin@kubesphere.io <br />
> Password: passw0rd

For details, please refer to <a href="https://docs.kubesphere.io/express/zh-CN/user-case/" target="_blank">KubeSphere User Guide</a>， and learn how to get started with it！
