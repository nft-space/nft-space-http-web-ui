FROM python

ADD . /nft-space-web-ui

WORKDIR /nft-space-web-ui

RUN pip install -r requirements.txt