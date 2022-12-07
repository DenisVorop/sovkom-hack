FROM python:3.10
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update
#RUN apt-get -y install gcc libffi-dev libssl-dev libxml2-dev libxslt-dev 
#swig \
 

ADD ./req.txt /app/req.txt
RUN python3 -m pip install -r /app/req.txt --no-cache-dir

#RUN adduser --disabled-password --gecos '' user
#USER user

EXPOSE 3000

#ENTRYPOINT /bin/bash -c "python3 main.py"
#CMD ["python3", "main.py"]

