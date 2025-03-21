PGDMP      5                }            test    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    test    DATABASE     x   CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE test;
                postgres    false                        3079    24585    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                   false            �           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                        false    2            �            1259    24622    booking    TABLE     �   CREATE TABLE public.booking (
    email text NOT NULL,
    tour_id integer NOT NULL,
    tour_name text NOT NULL,
    tour_date text NOT NULL
);
    DROP TABLE public.booking;
       public         heap    postgres    false            �            1259    16399    test1    TABLE     �   CREATE TABLE public.test1 (
    id integer NOT NULL,
    name text NOT NULL,
    age integer NOT NULL,
    phone_number text
);
    DROP TABLE public.test1;
       public         heap    postgres    false            �            1259    16398    test1_id_seq    SEQUENCE     �   ALTER TABLE public.test1 ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.test1_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    24627    tours    TABLE     q   CREATE TABLE public.tours (
    id integer NOT NULL,
    tour_name text NOT NULL,
    tour_date text NOT NULL
);
    DROP TABLE public.tours;
       public         heap    postgres    false            �            1259    24577    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    pass text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24576    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    219            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    218            L           2604    24580    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �          0    24622    booking 
   TABLE DATA           G   COPY public.booking (email, tour_id, tour_name, tour_date) FROM stdin;
    public          postgres    false    220   �       �          0    16399    test1 
   TABLE DATA           <   COPY public.test1 (id, name, age, phone_number) FROM stdin;
    public          postgres    false    217   c       �          0    24627    tours 
   TABLE DATA           9   COPY public.tours (id, tour_name, tour_date) FROM stdin;
    public          postgres    false    221   �       �          0    24577    users 
   TABLE DATA           6   COPY public.users (id, name, email, pass) FROM stdin;
    public          postgres    false    219          �           0    0    test1_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test1_id_seq', 1, true);
          public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 4, true);
          public          postgres    false    218            N           2606    16405    test1 test1_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test1
    ADD CONSTRAINT test1_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test1 DROP CONSTRAINT test1_pkey;
       public            postgres    false    217            R           2606    24633    tours tours_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tours DROP CONSTRAINT tours_pkey;
       public            postgres    false    221            P           2606    24584    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    219            �   �   x�+--u�M���+*�4�H,�,Vp�,�T�/-�4202�5��54�*ERh�������Y\�_��������Um�kd��Z��[��
�a���]���\�SRZ��ZQ�Z�����
�fh�k`����E��"�333,����� 1�Y�      �   #   x�3���M�42洰4426153������� RRA      �   i   x�3�H,�,Vp�,�T�/-�4202�5��54�2���MU��,.�/�LN�QO�Ɇ���52�2��Ϯ�Wp.�))-*p�(H-�L�KN�(34�50����� ���      �   M   x�3���M��L�H�-�Iu�M���+*�442�2�I-.�,pq�˘������@6�	����E�l�=... ��     