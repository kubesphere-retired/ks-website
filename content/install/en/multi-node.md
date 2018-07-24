##  Multi-node Mode

`Multi-node` mode means multiple nodes deployment, for example, single or multiple `master(s)`, multiple `nodes`, and multiple  `etcd` nodes. it is recommended to prepare at least `2` nodes and deploy to production environment.

**Note：**  <br/>


> It is recommended to select any one host in the cluster being served as a role of "`taskbox`" to execute installation task for other hosts before Multi-node deployment, and "`SSH Communication`" is required to be established between "taskbox" and other hosts.



****


### Step 1: Provision Linux Host

#### Prerequisites

The following section identifies the hardware specifications and system-level requirements of hosts within KubeSphere platform environment. To get started with Multi-node mode, you may need to prepare at least `2` hosts refer to the following specification.

#### Hardware Recommendations

| **Roles** | **Minimum Recommended** |
| --- | --- |
| **master** | Operating System：ubuntu16.04<br/>CPU：To be defined<br/>Memory：To be defined<br/>Disk：To be defined |
| **node** | Operating System：ubuntu16.04<br/>CPU：To be defined<br/>Memory：To be defined<br/>Disk：To be defined |
| **etcd** | Operating System：ubuntu16.04<br/>CPU：To be defined<br/>Memory：To be defined<br/>Disk：To be defined |



###  Step 2: Deployment Scenarios(Example description)

Take 192.168.0.10 (node1), 192.168.0.20 (node2) and 192.168.0.30 (node3) as an example.


**Attention: <br/>**
> node1 will be served as a role of "taskbox" to execute installation task, the host name of each node can be customized by the user.

#### Cluster Architecture

**Single master, Single etcd, Multiple nodes**
![](/pic04_en.png)



**Note:**  <br/>

> etcd is a distributed key value store that provides a reliable way to store data across a cluster of machines. The number of etcd node is required at least one. For high availability, it is recommended to deploy multiple etcd nodes, which can makes the Kubernetes cluster more reliable. The number of etcd nodes is recommended to be set to `odd number`. KubeSphere Express version just temporarily supports single etcd, we are going to support multiple etcd in the next AE version soon.


| **Host IP** | **Roles** |
| --- | --- |
| 192.168.0.10 | master , node , etcd |
| 192.168.0.20 |  node |
| 192.168.0.30 |  node |






###  Step 3: Provision Installation Files

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

**Attention: taskbox is required to configure "SSH password-less login", you can refer to [SSH Password-less Login Configuration Instructions ](#ssh-password-less-login-configuration-instructions) if needed.**

**4.** Execute following command to edit **`hosts.ini`** via Vim.：

```
$ vi conf/hosts.ini
```

**5.** In order to manage deployment process and target machines configuration, please refer to the following scripts to configure all hosts in `hosts.ini`,

**Attention：**

> There are 3 hosts in example and each host name can be customized by the user like "node1", "node2" and etc. "node1" is the taskbox as well as the local host.


**Example**

```
[all]
node1  ansible_connection=local local_release_dir={{ansible_env.HOME}}/releases ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node2  ansible_host=192.168.0.20 ip=192.168.0.20 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node3  ansible_host=192.168.0.30 ip=192.168.0.30 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password

[kube-master]
node1

[kube-node]
node1
node2    
node3


[etcd]
node1


[k8s-cluster:children]
kube-node
kube-master 
```


**Note：** <br/>

> - Each node's parameters like Internal IP and its password needs to be filled into [all] field. In this example, since "node1" served as `taskbox`, it just needs to replace "ansible_become_pass" with the current host password in the first line.
> - Other nodes like "node2" and "node3", for "ansible_host" and "ansible_become_pass" need to be replaced by their actual Internal IP and host password respectively in [all] field.
> - "node1" is served as the taskbox which is to execute installation for whole cluster, as well as the role of master and etcd, so "node1" needs to be filled into [kube-master] and [etcd] field.
> - At the same time, for "node1","node2" and "node3", they serve the role of node as well, so all of the hosts name need to be filled into [kube-node] field.



**6.** It is extremly recommended to prepare a server for storage service before Multi-node deployment. Then you will need to specify the storage class parameters in  **`vars.yml`** via Vim. Execute following command to edit `vars.yml`:

```
  $ vi conf/vars.yml
```


**Note：**  <br/>

> - You may to modify the relevant configurations like network or storage class, otherwise it will be executed with default parameters without any modifications**

> - Network：KubeSphere supports `calico` by default

> - Supported Storage Classes：`GlusterFS、CephRBD`

> **For details on storage configuration, please refer to [Storage Configuration Instructions](#storage-configuration-instructions)**  


###  Step 4: Get Started With Deployment

The environment and file monitoring, dependent software installation of KubeSphere, automated installation of Kubernetes and etcd, and automated storage configuration, all of these procedures will be automatically processing in this deployment.

The KubeSphere installation package will automatically install the relevant dependent software as following table described.

#### Software Recommendations

| **Dependent Software** | **Supported Version** |
| --- | --- |
| Ansible | v2.4 (or newer) |
| Python-netaddr | v0.7.18(or newer) |
| Jinja | v2.9 (or newer) |


Following section describes how to get started with Multi-node mode deployment.

> The current system is Ubuntu 16.04. It is recommended to use ubuntu as default user to complete following steps.

Following section describes how to start `Multi-node` deployment.

**1.** Go into `scripts`(If current location is in kubesphereinstaller)

```
$ cd scripts
```

**2.** Execute **`install.sh`**：

```
$ ./install.sh
```

**3.** Enter`2` to select `Multi-node` mode to start：

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
Please Select An Option: 2
2
```

**Attention：** <br/>

> If any errors occur, you can check according to the error message, please give us feedback as well.


**4.** Test **KubeSphere** Multi-node Deployment：

**(1).**If you can see the following "Successful" result being returned after `install.sh` completed, that means KubuSphere installation is ready.

```
Play Rep  ****************************************
KubeSphere   : ok=69 changed=68 unreachable=0 
failed=0
Succesful!
##################################################
KubeSphere is running！
Matser IP: 10.160.6.6
Ks-console-nodeport: 32117
Ks-apiserver-nodeport 32002
##################################################
```

**(2).**Then you will be able to access KubeSphere login page with the IP address of the host and correct port. The port number will be automatically generated in the result page as above screenshot showing "ks-console-nodeport:32117". <br/>
**Example**： [http://139.198.121.143:31413](http://139.198.121.143:31413)
<br/>
![](/pic02.png)


### Summary
When KubeSphere is deployed successfully ，you will be able to follow with [*"KubeSphere User Guide"*](www.qingcloud.com)，then log in to KubeSphere and learn how to get started with it！
