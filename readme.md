一个使用nextjs开发的简单博客系统，支持markdown格式的文章。

认证、数据库、云存储均使用memfire cloud

### 创建数据库表

```
create table public.post
(
id         uuid              not null
constraint article_pkey
primary key,
created_at timestamptz(6)    not null,
updated_at timestamptz(6)    not null,
content    text              not null,
picture    text              not null,
public     bool default true not null,
title      text,
excerpt    text
);

```

### 创建用户

管理员用户

```
```angular2html
curl -X POST '[应用网址]/auth/v1/signup' -H "apikey: [service_role]" -H "Content-Type: application/json" -d '{"email":[私人登陆邮箱],"password":"[密码]"}'
```

游客账户
```
```angular2html
curl -X POST '[应用网址]/auth/v1/signup' -H "apikey: [service_role]" -H "Content-Type: application/json" -d '{"email":[游客通用邮箱],"password":"[密码]"}'
```

使用创建的用户账号密码替换/pages/login.jsx中的登陆账户，修改auth.user表中私人账户角色为admin，游客账户角色为guest。

### 运行代码

```yarn install```

```yarn dev```

### 打包

```yarn build```

### 发布

```yarn export```

