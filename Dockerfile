FROM leoendlessx/gatsby:latest
COPY nginx-server-rules.conf /etc/nginx/server.conf
ADD public/ /pub