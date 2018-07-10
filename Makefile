# Copyright 2018 The KubeSphere Authors. All rights reserved.
# Use of this source code is governed by a Apache license
# that can be found in the LICENSE file.

default:

caddy:
	docker run -d -p 80:80 -p 443:443 --restart=always -v /root/.caddy:/root/.caddy kubesphere/kubesphere.github.io

local:
	gatsby build
	docker build -f Dockerfile.local -t kubesphere/kubesphere.github.io.local  --no-cache .
	docker run --rm -p 2015:2015 kubesphere/kubesphere.github.io.local

favicon:
	png2ico static/favicon.ico static/logo-small.png

clean:
