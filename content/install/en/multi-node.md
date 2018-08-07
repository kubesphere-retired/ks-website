##  Multi-Node Mode

`Multi-Node` mode means multiple nodes deployment, for example, single or multiple `master(s)`, multiple `nodes`, single or multiple  `etcd` node(s). it is recommended to prepare at least `2` nodes and deploy to production environment. Typically, select any one host in the cluster being served as a role of "`taskbox`" to execute installation task for other hosts before multi-node deployment,  "`SSH Communication`" is required to be established between "taskbox" and other hosts.


### Step 1: Provision Linux Host

#### Prerequisites

The following section identifies the hardware specifications and system-level requirements of hosts within KubeSphere platform environment. To get started with multi-node mode, you may need to prepare at least `2` hosts refer to the following specification.

#### Hardware Recommendations


| Operating System | Minimum Requirements |  Recommendations |
| --- | --- | --- |
| ubuntu 16.04 LTS 64bit | CPU：8 Core <br/> Memory：12 G <br/> Disk Space：40 G | CPU：16 Core <br/> Memory：32 G <br/> Disk Space：100 G |



The following section describes an example to introduce multi-node mode deployment. This example prepares 3 hosts, with the host name "master" serve as the taskbox, and the host name of each node can be customized by the user. Assume that the host information as following table showing:

| Host IP | Host Name | Role |
| --- | --- | --- |
|192.168.0.10|master|master, etcd, node|
|192.168.0.20|node1|node|
|192.168.0.30|node2|node|



#### Cluster Architecture

Single master, Single etcd, Multiple nodes

![](/pic04_en.svg)



**Note:**  <br/>

> etcd is a distributed key value store that provides a reliable way to store data across a cluster of machines. The number of etcd node is required at least one. For high availability, it is recommended to deploy multiple etcd nodes, which can makes the Kubernetes cluster more reliable. The number of etcd nodes is recommended to be set to `odd number`. KubeSphere Express Edition just temporarily supports single etcd, we are going to support multiple etcd in the next Advanced Edition soon.


###  Step 2: Provision Installation Files


**1.**  Download <a href="https://drive.yunify.com/s/DZ8FAIEaKfU98JT" target="_blank">KubeSphere Installer</a>

**2.**  When you get the installation package, please execute following command to unzip the package.

```bash
$ tar -zxvf kubesphere-all-express-1.0.0-alpha.tar.gz
```

**3.** Go into “`kubesphere-all-express-1.0.0-alpha`” folder.

```bash
$ cd kubesphere-all-express-1.0.0-alpha
```


**4.** In order to manage deployment process and target machines configuration, please refer to the following scripts to configure all hosts in `hosts.ini`,

**Attention：**

> Each host occupies one line of information and cannot be wrapped.

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


**5.** It is required to prepare a server for storage service before multi-node deployment. Then you will need to specify the storage class parameters in  `vars.yml` . Then reference the details on storage configuration, please go to <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#附录1：存储配置说明" target="_blank">Storage Configuration Instructions</a>.


**Note：**  <br/>

> - You may to modify the relevant configurations like network or storage class, otherwise it will be executed with default parameters without any modifications.

> - Network：KubeSphere supports `calico` by default.

> - Supported Storage Classes：`GlusterFS、CephRBD` , for the details on storage configuration, please refer to <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#附录1：存储配置说明" target="_blank">Storage Configuration Instructions</a>.

> - Typically, you need to configure persistent storage. Since multi-node mode does not support local storage, it's recommended to modify the local storage default configuration to `false`, then you would configure persistent storage such as GlusterFS or CephRBD. Following screenshot describes an example of how to configure CephCBD.

 
```yaml
# Local volume provisioner deployment(Only all-in-one)
local_volume_provisioner_enabled: false
local_volume_provisioner_storage_class: local
local_volume_is_default_class: false


# Ceph_rbd  deployment
ceph_rbd_enabled: true
ceph_rbd_is_default_class: true
ceph_rbd_storage_class: rbd
# e.g. ceph_rbd_monitors:
#   - 172.24.0.1:6789
#   - 172.24.0.2:6789
#   - 172.24.0.3:6789
ceph_rbd_monitors:
  - 192.168.100.8:6789
ceph_rbd_admin_id: admin
# e.g. ceph_rbd_admin_secret: AQAnwihbXo+uDxAAD0HmWziVgTaAdai90IzZ6Q==
ceph_rbd_admin_secret: AQCU00Zb5YYZAxAA9Med5rbKZT+pA91vMYM0Jg==
ceph_rbd_pool: rbd
ceph_rbd_user_id: admin
# e.g. ceph_rbd_user_secret: AQAnwihbXo+uDxAAD0HmWziVgTaAdai90IzZ6Q==
ceph_rbd_user_secret: AQCU00Zb5YYZAxAA9Med5rbKZT+pA91vMYM0Jg==
ceph_rbd_fsType: ext4
ceph_rbd_imageFormat: 1
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

> - The installer will prompt you if you have configured the storage or not. If not, please enter "no", then return to the directory and continue to configure the storage, for details please refer to <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#附录1：存储配置说明" target="_blank">Storage Configuration Instructions</a>.

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

**4.** Test KubeSphere multi-node Deployment：

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


**(2).**Then you will be able to access KubeSphere login page with the host IP and correct port. The port number will be automatically generated in the result page as above screenshot showing "ks-console-nodeport". 
Then you will be able to access the KubeSphere web via EIP and port forwarding.

**Example**： [http://139.198.121.143:8080](http://139.198.121.143:8080)

![](/pic02.png)


### Summary
When KubeSphere is deployed successfully ，you will be able to use following account and password to log in to the KubeSphere console to experience.

> Account: admin@kubesphere.io 

> Password: passw0rd

For details, please refer to <a href="https://docs.kubesphere.io/express/zh-CN/user-case/" target="_blank">KubeSphere User Guide</a>， and learn how to get started with it！
