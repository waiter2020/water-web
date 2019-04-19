FROM nginx

ADD dist/  /usr/share/nginx/html/
ADD default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
#RUN rm  /etc/nginx/conf.d/default.conf -rf

