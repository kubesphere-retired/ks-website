# Copyright 2018 The KubeSphere Authors. All rights reserved.
# Use of this source code is governed by a Apache license
# that can be found in the LICENSE file.
FROM kubesphere/caddy
COPY Caddyfile /etc/Caddyfile

VOLUME /root/.caddy
WORKDIR /srv

RUN apk add --update yarn

ENTRYPOINT ["/usr/bin/caddy"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout"]
