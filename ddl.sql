create table tb_empresas
(
  id_empresa int unsigned auto_increment primary key,
  nm_empresa varchar(255) not null,
  dt_cadastro timestamp  default current_timestamp,
  dt_atualizacao timestamp    null
)
  collate = utf8mb4_unicode_ci;

create table tb_usuarios
(
  id_usuario     int unsigned auto_increment primary key,
  id_empresa     int unsigned not null,
  nm_usuario     varchar(255) not null,
  nm_email       varchar(255) not null,
  nm_senha       varchar(255) not null,
  dt_cadastro    timestamp  default current_timestamp,
  dt_atualizacao timestamp    null,
  constraint tb_usuarios_nm_email_unique
  unique (nm_email),
  constraint tb_usuarios_id_empresa_foreign
  foreign key (id_empresa) references tb_empresas (id_empresa)
)
  collate = utf8mb4_unicode_ci;

create index tb_usuarios_id_empresa_foreign
  on tb_usuarios (id_empresa);

create table tb_categorias
(
  id_categoria int unsigned auto_increment primary key,
  id_empresa   int unsigned not null,
  ds_categoria varchar(100) not null,
  tp_categoria varchar(1)   not null,
  dt_cadastro    timestamp  default current_timestamp,
  dt_atualizacao timestamp    null,
  constraint tb_categorias_id_empresa_foreign
  foreign key (id_empresa) references tb_empresas (id_empresa)
)
  collate = utf8mb4_unicode_ci;

create index tb_categorias_id_empresa_foreign
  on tb_categorias (id_empresa);

create table tb_contas
(
  id_conta   int unsigned auto_increment primary key,
  id_empresa int unsigned not null,
  ds_conta   varchar(100) not null,
  dt_cadastro    timestamp  default current_timestamp,
  dt_atualizacao timestamp    null,
  constraint tb_contas_id_empresa_foreign
  foreign key (id_empresa) references tb_empresas (id_empresa)
)
  collate = utf8mb4_unicode_ci;

create index tb_contas_id_empresa_foreign
  on tb_contas (id_empresa);

create table tb_movimentos
(
  id_movimento   int unsigned auto_increment primary key,
  id_conta       int unsigned   not null,
  id_categoria   int unsigned   not null,
  ds_movimento   varchar(255)   null,
  dt_previsao    date           null,
  dt_confirmacao date           null,
  vl_previsto    decimal(10, 2) null,
  vl_confirmado  decimal(10, 2) null,
  dt_cadastro    timestamp  default current_timestamp,
  dt_atualizacao timestamp    null,
  constraint tb_movimentos_id_conta_foreign
  foreign key (id_conta) references tb_contas (id_conta),
  constraint tb_movimentos_id_categoria_foreign
  foreign key (id_categoria) references tb_categorias (id_categoria)
)
  collate = utf8mb4_unicode_ci;

create index tb_movimentos_id_categoria_foreign
  on tb_movimentos (id_categoria);

create index tb_movimentos_id_conta_foreign
  on tb_movimentos (id_conta);



delimiter $$
create procedure get_categorias(in empresa int)
  begin
    select *
      from tb_categorias
     where id_empresa = empresa;
  end $$
delimiter ;

delimiter $$
create procedure post_categoria(out id int, in empresa int, in categoria varchar(255), in tipo char)
  begin
    insert into tb_categorias
    (id_empresa, ds_categoria, tp_categoria, dt_atualizacao)
    values
    (empresa, categoria, tipo, current_timestamp());
    set id = last_insert_id();
  end $$
delimiter ;

delimiter $$
create procedure put_categoria(in id int, in categoria varchar(255), in tipo char)
  begin
    update tb_categorias
       set ds_categoria = categoria,
           tp_categoria = tipo,
         dt_atualizacao = current_timestamp()
     where id_categoria = id;
  end $$
delimiter ;

delimiter $$
create procedure delete_categoria(in id int)
  begin
    delete from tb_categorias where id_categoria = id;
  end $$
delimiter ;

delimiter $$
create procedure get_categoria(in id int)
  begin
    select *
      from tb_categorias
        where id_categoria = id;
  end $$
delimiter ;

delimiter $$
create procedure get_contas(in empresa int)
  begin
    select *
      from tb_contas
     where id_empresa = empresa;
  end $$
delimiter ;

delimiter $$
create procedure get_conta(in id int)
  begin
    select *
      from tb_contas
        where id_conta = id;
  end $$
delimiter ;

delimiter $$
create procedure post_conta(out id int, in empresa int, in conta varchar(255))
  begin
    insert into tb_contas
    (id_empresa, ds_conta, dt_atualizacao)
    values
    (empresa, conta, current_timestamp());
    set id = last_insert_id();
  end $$
delimiter ;

delimiter $$
create procedure put_conta(in id int, in conta varchar(255))
  begin
    update tb_contas
       set ds_conta = conta,
           dt_atualizacao = current_timestamp()
     where id_conta = id;
  end $$
delimiter ;

delimiter $$
create procedure delete_conta(in id int)
  begin
    delete from tb_contas where id_conta = id;
  end $$
delimiter ;

delimiter $$
create procedure get_movimentos(in empresa int)
  begin
    select m.id_movimento,
           m.id_conta,
           m.id_categoria,
           m.ds_movimento,
           m.dt_previsao,
           m.dt_confirmacao,
           m.vl_previsto,
           m.vl_confirmado,
           c.ds_categoria,
           c.tp_categoria,
           b.ds_conta
      from tb_movimentos m,
           tb_categorias c,
           tb_contas b
     where m.id_categoria = c.id_categoria
       and m.id_conta = b.id_conta
       and b.id_conta in (select id_conta
                            from tb_contas
                           where id_empresa = empresa);
  end $$
delimiter ;

delimiter $$
create procedure get_movimento(in id int)
  begin
    select m.id_movimento,
           m.id_conta,
           m.id_categoria,
           m.ds_movimento,
           m.dt_previsao,
           m.dt_confirmacao,
           m.vl_previsto,
           m.vl_confirmado,
           c.ds_categoria,
           c.tp_categoria,
           b.ds_conta
      from tb_movimentos m,
           tb_categorias c,
           tb_contas b
     where m.id_categoria = c.id_categoria
       and m.id_conta = b.id_conta
       and m.id_movimento = id;
  end $$
delimiter ;

delimiter $$
create procedure post_movimento(
  out id int,
  in conta int,
  in categoria int,
  in movimento varchar(255),
  in previsao date,
  in confirmacao date,
  in previsto decimal,
  in confirmado decimal
)
  begin
    insert into tb_movimentos
    (id_conta, id_categoria, ds_movimento, dt_previsao, dt_confirmacao, vl_previsto, vl_confirmado, dt_atualizacao)
    values
    (conta, categoria, movimento, previsao, confirmacao, previsto, confirmado, current_timestamp());
    set id = last_insert_id();
  end $$
delimiter ;

delimiter $$
create procedure put_movimento(
  in id int,
  in conta int,
  in categoria int,
  in movimento varchar(255),
  in previsao date,
  in confirmacao date,
  in previsto decimal,
  in confirmado decimal
)
  begin
    update tb_movimentos
      set id_categoria = categoria,
        id_conta = conta,
        ds_movimento = movimento,
        dt_previsao = previsao,
        dt_confirmacao = confirmacao,
        vl_previsto = previsto,
        vl_confirmado = confirmado,
        dt_atualizacao = current_timestamp()
    where id_movimento = id;
  end $$
delimiter ;

delimiter $$
create procedure delete_movimento(in id int)
  begin
    delete from tb_movimentos where id_movimento = id;
  end $$
delimiter ;

delimiter $$
create procedure get_usuarios(in empresa int)
  begin
    select *
    from tb_usuarios
    where id_empresa = empresa;
  end $$
delimiter ;

delimiter $$
create procedure get_usuario(in id int)
  begin
    select *
    from tb_usuarios
    where id_usuario = id;
  end $$
delimiter ;

delimiter $$
create procedure post_usuario(out id int, in empresa int, in usuario varchar(255), in email varchar(255), in senha varchar(255))
  begin
    insert into tb_usuarios
    (id_empresa, nm_usuario, nm_email, nm_senha, dt_atualizacao)
    values
    (empresa, usuario, email, senha, current_timestamp());
    set id = last_insert_id();
  end $$
delimiter ;

delimiter $$
create procedure put_usuario(in id int, in usuario varchar(255), in email varchar(255), in senha varchar(255))
  begin
    update tb_usuarios
      set nm_usuario = usuario,
        nm_email = email,
        nm_senha = senha
    where id_usuario = id;
  end $$
delimiter ;

delimiter $$
create procedure delete_usuario(in id int)
  begin
    delete from tb_usuarios where id_usuario = id;
  end $$
delimiter ;

delimiter $$
create procedure auth_usuario(in email varchar(255), senha varchar(255))
  begin
    select *
    from tb_usuarios
    where nm_email = email
    and nm_senha = senha;
  end $$
delimiter ;