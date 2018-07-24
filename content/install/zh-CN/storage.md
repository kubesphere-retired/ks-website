## 存储配置

### 配置存储类型

可使用 `GlusterFS`、`CephRBD` 作为持久化存储，需提前准备相关存储服务端。

 在您准备好存储服务端以后，只需要参考以下表中的参数说明，在 `conf` 目录下的 `vars.yml` 中，根据您存储服务端所支持的存储类型，在 `vars.yml` 的 `# Ceph_rbd  deployment` 或 `# GlusterFS  provisioner deployment` 或 `# Local volume provisioner deployment(Only all-in-one)` 部分，参考脚本中的示例修改对应参数，即可完成 Kubernetes 集群存储类型的配置。

> 1. KubeSphere 安装过程中程序将会根据用户在 vars.yml 里选择配置的存储类型如 GlusterFS 或 CephRBD，进行自动化地安装对应 Kubernetes 集群所需的GlusterFS Client 或 CephRBD Client，无需手动安装 Client。
> 2. `Ceph` 集群部署可参考 [Install Ceph](http://docs.ceph.com/docs/master/)
> 3. `Gluster` 集群部署可参考 [Install Gluster](https://www.gluster.org/install/) 或 [Gluster Docs](http://gluster.readthedocs.io/en/latest/Install-Guide/Install/) 并且需要安装[Heketi 管理端](https://github.com/heketi/heketi/tree/master/docs/admin)
> 4. Kubernetes 集群中不可同时存在两个默认存储类型，若要指定默认存储类型前请先确保当前集群中无默认存储类型。

以下对存储相关配置做简要说明(参数详解请参考 [storage classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) )：

| **Local volume** | **Description** |
| --- | --- |
| local\_volume\_provisioner\_enabled | 是否使用local\_volume作为持久化存储  是: true; 否: false |
| local\_volume\_provisioner\_storage\_class | storage\_class名称   默认：local |
| local\_volume\_is\_default\_class | 是否设定为默认storage\_class 是: true; 否: false <br/> 注：系统中存在多种storage\_class时，只能设定一种为：default\_class |

> 说明： 在您配置好 local Volume (只有 all-in-one 支持这类存储) 并成功安装 KubeSphere 后，请参考 [《KubeSphere 用户指南》](https://kubesphere.qingcloud.com), 在用户指南的附录 1 对如何使用 Local Volume 有详细说明。

<br/>

| **Ceph\_RBD** | **Description** |
| --- | --- |
| ceph\_rbd\_enabled | 是否使用 ceph\_RBD 作为持久化存储，是: true; 否: false |
| ceph\_rbd\_storage\_class | storage\_class 名称 |
| ceph\_rbd\_is\_default\_class | 是否设定为默认 storage\_class， 是: true; 否: false <br/> 注：系统中存在多种 storage\_class 时，只能设定一种为：default\_class |
| ceph\_rbd\_monitors | 根据 Ceph RBD 服务端配置填写，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_admin\_id | 能够在存储池中创建 images 的客户端 ID ，默认: admin，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_admin\_secret | Admin_id 的 secret，安装程序将会自动在 kube-system 项目内创建此 secret，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_pool | 可使用的 CephRBD 存储池，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_user\_id | 用于映射 RBD images 的 ceph 客户端 ID 默认: admin，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_user\_secret | User_id 的 secret，需注意在所使用 rbd image 的项目内都需创建此 Secret，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_fsType | kubernetes 支持的 fsType，默认：ext4，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_imageFormat | CephRBD images 格式，默认："1"，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
|ceph\_rbd\_imageFeatures| 当 ceph\_rbd\_imageFormat 字段不为 1 时需填写此字段，可参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)|

> 注： 存储类型中创建 secret 所需 ceph secret 如 ceph_rbd_admin_secret 和 ceph_rbd_user_secret 可在 ceph 服务端通过以下命令获得：

```
  $ ceph auth get-key client.admin
```

<br/>

| **GlusterFS（需提供 heketi 所管理的 glusterfs 集群）**| **Description** |
| --- | --- |
| glusterfs\_provisioner\_enabled | 是否使用 GlusterFS 作为持久化存储，是: true; 否: false |
| glusterfs\_provisioner\_storage\_class | storage\_class 名称 |
| glusterfs\_is\_default\_class | 是否设定为默认 storage\_class，是: true; 否: false <br/> 注：系统中存在多种 storage\_class 时，只能设定一种为：default\_class| --- | --- |glusterfs\_provisioner\_resturl | Heketi 服务 url，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) | glusterfs\_provisioner\_clusterid | Heketi 服务端输入 heketi-cli cluster list 命令获得，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_restauthenabled | Gluster 启用对 REST 服务器的认证,参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_resturl | Heketi 服务端 url，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_clusterid | Gluster 集群 id，登录 heketi 服务端输入 heketi-cli cluster list 得到 Gluster 集群 id，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_restuser | 能够在 Gluster pool 中创建 volume 的 Heketi 用户，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_secretName | secret 名称，安装程序将会在 kube-system 项目内自动创建此 secret，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_gidMin | glusterfs\_provisioner\_storage\_class 中 GID 的最小值，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_gidMax | glusterfs\_provisioner\_storage\_class 中 GID 的最大值，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_volumetype | Volume 类型，参数配置请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| jwt\_admin\_key | heketi 服务器中 /etc/heketi/heketi.json 的 jwt.admin.key 字段 |

> 注： Glusterfs 存储类型中所需的 `glusterfs_provisioner_clusterid` 可在 glusterfs 服务端通过以下命令获得：

```
 $ export HEKETI_CLI_SERVER=http://localhost:8080
 $ heketi-cli cluster list
```
