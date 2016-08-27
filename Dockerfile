FROM daocloud.io/library/node:6.4.0
RUN npm install gitbook-cli -g
RUN mkdir /book
WORKDIR /book
ADD . /book
RUN npm install git+https://github.com/runforever/gitbook-plugin-pyshell.git
RUN gitbook build

EXPOSE 4000
CMD ["gitbook", "serve"]