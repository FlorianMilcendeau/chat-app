# Chat-app

## Getting started

1. Clone the repos

```
git clone https://github.com/FlorianMilcendeau/MyMeet.git
```

2. Run **make install** to init environment variables

```
make install
```

3. Run docker's containers (Only if **make install** has already been executed.)

```
make start
```

4. If you want to run the tests

```
make test
```

## Env Sample

1. Env root folder

```
PORT=<YOUR_PORT>

# debug logger
DEBUG=api*

# Database
DB_ROOT_PASSWORD=<YOUR_ROOT_PASSWORD>
DEV_DB_NAME=<YOUR_DB_NAME>
DEV_DB_USER=<YOUR_USERNAME>
DEV_DB_PASSWORD=<YOUR_PASSWORDS>

CI_DB_NAME=<YOUR_DB_NAME>
CI_DB_USER=<YOUR_USERNAME>
CI_DB_PASSWORD=<YOUR_PASSWORDS>

```
