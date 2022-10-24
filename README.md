一个使用nextjs开发的简单博客系统，支持markdown格式的文章。

认证、数据库、云存储均使用memfire cloud

### 创建应用

登陆[MemfireCloud](https://memfiredb.com/)，在`我的应用`中创建一个新应用，创建成功后进入应用获取应用网址和API密钥

### 创建数据库表

应用创建成功后MemfireCloud会为该应用创建对应的数据库，进入`我的应用`->`数据库`新建数据库表，或从本地连接我们的应用数据库通过sql创建数据库表

```
create table post
(
    id         uuid                                        not null
        constraint article_pkey
            primary key,
    created_at timestamptz(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at timestamptz(6) default CURRENT_TIMESTAMP(6) not null,
    content    text                                        not null,
    picture    text                                        not null,
    public     bool           default true                 not null,
    title      text,
    excerpt    text
);

```

### 创建用户

通过命令行终端创建管理员用户，`[应用网址]`和`[service_role]`可以在`我的应用`->`总览`中查看

```
curl -X POST '[应用网址]/auth/v1/signup' -H "apikey: [service_role]" -H "Content-Type: application/json" -d '{"email":"[私人登陆邮箱]","password":"[密码]"}'
```

使用创建的账号替换`/pages/login.tsx`和`/admin/login.tsx`中的登陆账户

### 创建云存储

在`我的应用`->`云存储`中新建bucket，设置为公开，在bucket权限设置中创建新规则

```
CREATE POLICY "create post" ON storage.objects FOR INSERT USING (
bucket_id = '[YOUR BUCKET NAME]' AND auth.role() = 'authenticated'
);

CREATE POLICY "update post" ON storage.objects FOR UPDATE USING (
bucket_id = '[YOUR BUCKET NAME]' AND auth.role() = 'authenticated'
);
```

### 运行环境

推荐node版本v16

### 运行代码

```yarn install```

### 开发环境运行
```yarn dev```

### 打包

```yarn build```

### 生产环境运行

```yarn start```

