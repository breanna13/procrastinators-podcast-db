--
-- PostgreSQL database dump
--

\restrict pTiQhOjfrSzdZcOCTpNyhYDVtaMLGJfyScGJczGc5Zz24ry9j9w4VOT1ocJfzbj

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.22 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: episode_hosts; Type: TABLE; Schema: public; Owner: breanna.white
--

CREATE TABLE public.episode_hosts (
    id integer NOT NULL,
    episode_id integer NOT NULL,
    host_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.episode_hosts OWNER TO "breanna.white";

--
-- Name: episode_hosts_id_seq; Type: SEQUENCE; Schema: public; Owner: breanna.white
--

CREATE SEQUENCE public.episode_hosts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.episode_hosts_id_seq OWNER TO "breanna.white";

--
-- Name: episode_hosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: breanna.white
--

ALTER SEQUENCE public.episode_hosts_id_seq OWNED BY public.episode_hosts.id;


--
-- Name: episodes; Type: TABLE; Schema: public; Owner: breanna.white
--

CREATE TABLE public.episodes (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    episode_number integer,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    release_date text
);


ALTER TABLE public.episodes OWNER TO "breanna.white";

--
-- Name: episodes_id_seq; Type: SEQUENCE; Schema: public; Owner: breanna.white
--

CREATE SEQUENCE public.episodes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.episodes_id_seq OWNER TO "breanna.white";

--
-- Name: episodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: breanna.white
--

ALTER SEQUENCE public.episodes_id_seq OWNED BY public.episodes.id;


--
-- Name: hosts; Type: TABLE; Schema: public; Owner: breanna.white
--

CREATE TABLE public.hosts (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.hosts OWNER TO "breanna.white";

--
-- Name: hosts_id_seq; Type: SEQUENCE; Schema: public; Owner: breanna.white
--

CREATE SEQUENCE public.hosts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hosts_id_seq OWNER TO "breanna.white";

--
-- Name: hosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: breanna.white
--

ALTER SEQUENCE public.hosts_id_seq OWNED BY public.hosts.id;


--
-- Name: episode_hosts id; Type: DEFAULT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.episode_hosts ALTER COLUMN id SET DEFAULT nextval('public.episode_hosts_id_seq'::regclass);


--
-- Name: episodes id; Type: DEFAULT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.episodes ALTER COLUMN id SET DEFAULT nextval('public.episodes_id_seq'::regclass);


--
-- Name: hosts id; Type: DEFAULT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.hosts ALTER COLUMN id SET DEFAULT nextval('public.hosts_id_seq'::regclass);


--
-- Data for Name: episode_hosts; Type: TABLE DATA; Schema: public; Owner: breanna.white
--

COPY public.episode_hosts (id, episode_id, host_id, created_at) FROM stdin;
1	1	1	2026-01-06 10:44:25.479705
2	1	2	2026-01-06 10:44:25.479705
3	1	3	2026-01-06 10:44:25.479705
4	1	4	2026-01-06 10:44:25.479705
5	1	5	2026-01-06 10:44:25.479705
6	1	6	2026-01-06 10:44:25.479705
743	151	1	2026-01-12 18:36:17.06876
744	151	3	2026-01-12 18:36:17.06876
745	151	5	2026-01-12 18:36:17.06876
746	152	1	2026-01-12 18:36:26.578016
747	152	3	2026-01-12 18:36:26.578016
748	152	5	2026-01-12 18:36:26.578016
749	152	4	2026-01-12 18:36:26.578016
750	152	8	2026-01-12 18:36:26.578016
751	153	1	2026-01-12 18:36:33.488832
752	153	2	2026-01-12 18:36:33.488832
753	153	3	2026-01-12 18:36:33.488832
754	153	5	2026-01-12 18:36:33.488832
755	153	4	2026-01-12 18:36:33.488832
756	153	6	2026-01-12 18:36:33.488832
757	153	8	2026-01-12 18:36:33.488832
758	153	9	2026-01-12 18:36:33.488832
759	154	1	2026-01-12 18:36:40.860758
760	154	3	2026-01-12 18:36:40.860758
761	154	4	2026-01-12 18:36:40.860758
762	154	2	2026-01-12 18:36:40.860758
763	154	8	2026-01-12 18:36:40.860758
31	6	1	2026-01-06 11:39:10.620044
32	6	3	2026-01-06 11:39:10.620044
33	6	4	2026-01-06 11:39:10.620044
34	6	5	2026-01-06 11:39:10.620044
35	6	8	2026-01-06 11:39:10.620044
36	6	10	2026-01-06 11:39:10.620044
37	7	1	2026-01-06 11:54:09.347091
38	7	2	2026-01-06 11:54:09.347091
39	7	3	2026-01-06 11:54:09.347091
40	7	5	2026-01-06 11:54:09.347091
41	7	4	2026-01-06 11:54:09.347091
42	7	6	2026-01-06 11:54:09.347091
43	7	7	2026-01-06 11:54:09.347091
44	7	8	2026-01-06 11:54:09.347091
45	8	1	2026-01-06 11:55:52.530756
46	8	2	2026-01-06 11:55:52.530756
47	8	7	2026-01-06 11:55:52.530756
48	8	5	2026-01-06 11:55:52.530756
49	8	4	2026-01-06 11:55:52.530756
50	9	1	2026-01-12 18:26:02.882613
51	9	2	2026-01-12 18:26:02.882613
52	9	3	2026-01-12 18:26:02.882613
53	9	5	2026-01-12 18:26:02.882613
54	9	4	2026-01-12 18:26:02.882613
55	10	1	2026-01-12 18:28:13.736704
56	10	2	2026-01-12 18:28:13.736704
57	10	3	2026-01-12 18:28:13.736704
58	10	5	2026-01-12 18:28:13.736704
59	10	4	2026-01-12 18:28:13.736704
60	10	8	2026-01-12 18:28:13.736704
61	11	1	2026-01-12 18:28:17.469209
62	11	3	2026-01-12 18:28:17.469209
63	11	5	2026-01-12 18:28:17.469209
64	11	4	2026-01-12 18:28:17.469209
65	11	9	2026-01-12 18:28:17.469209
66	12	3	2026-01-12 18:28:52.98552
67	12	5	2026-01-12 18:28:52.98552
68	12	4	2026-01-12 18:28:52.98552
69	12	1	2026-01-12 18:28:52.98552
70	12	8	2026-01-12 18:28:52.98552
71	13	1	2026-01-12 18:29:03.83334
72	13	3	2026-01-12 18:29:03.83334
73	13	5	2026-01-12 18:29:03.83334
74	13	4	2026-01-12 18:29:03.83334
75	14	1	2026-01-12 18:29:09.718036
76	14	8	2026-01-12 18:29:09.718036
77	14	5	2026-01-12 18:29:09.718036
78	14	6	2026-01-12 18:29:09.718036
79	14	7	2026-01-12 18:29:09.718036
80	15	3	2026-01-12 18:29:13.217827
81	15	2	2026-01-12 18:29:13.217827
82	15	4	2026-01-12 18:29:13.217827
83	15	1	2026-01-12 18:29:13.217827
84	15	8	2026-01-12 18:29:13.217827
85	16	1	2026-01-12 18:30:21.210267
86	16	3	2026-01-12 18:30:21.210267
87	16	5	2026-01-12 18:30:21.210267
88	16	4	2026-01-12 18:30:21.210267
89	17	1	2026-01-12 18:30:33.016791
90	17	7	2026-01-12 18:30:33.016791
91	17	4	2026-01-12 18:30:33.016791
92	17	5	2026-01-12 18:30:33.016791
93	18	1	2026-01-12 18:30:45.272776
94	18	2	2026-01-12 18:30:45.272776
95	18	3	2026-01-12 18:30:45.272776
96	18	5	2026-01-12 18:30:45.272776
97	18	4	2026-01-12 18:30:45.272776
98	18	6	2026-01-12 18:30:45.272776
99	18	7	2026-01-12 18:30:45.272776
100	18	8	2026-01-12 18:30:45.272776
101	19	1	2026-01-12 18:30:54.577045
102	19	3	2026-01-12 18:30:54.577045
103	19	5	2026-01-12 18:30:54.577045
104	19	4	2026-01-12 18:30:54.577045
105	19	7	2026-01-12 18:30:54.577045
106	19	8	2026-01-12 18:30:54.577045
107	20	1	2026-01-12 18:30:57.234328
108	20	2	2026-01-12 18:30:57.234328
109	20	3	2026-01-12 18:30:57.234328
110	20	5	2026-01-12 18:30:57.234328
111	20	4	2026-01-12 18:30:57.234328
112	20	6	2026-01-12 18:30:57.234328
113	20	7	2026-01-12 18:30:57.234328
114	20	8	2026-01-12 18:30:57.234328
115	20	9	2026-01-12 18:30:57.234328
764	155	1	2026-01-12 18:36:47.976138
765	155	5	2026-01-12 18:36:47.976138
766	155	3	2026-01-12 18:36:47.976138
767	155	2	2026-01-12 18:36:47.976138
768	155	8	2026-01-12 18:36:47.976138
769	156	1	2026-01-12 18:36:54.286054
770	156	3	2026-01-12 18:36:54.286054
771	156	2	2026-01-12 18:36:54.286054
772	156	8	2026-01-12 18:36:54.286054
773	157	1	2026-01-12 18:36:59.823309
774	157	3	2026-01-12 18:36:59.823309
775	157	2	2026-01-12 18:36:59.823309
776	158	1	2026-01-12 18:37:06.967486
777	158	2	2026-01-12 18:37:06.967486
778	158	3	2026-01-12 18:37:06.967486
779	158	5	2026-01-12 18:37:06.967486
780	158	4	2026-01-12 18:37:06.967486
781	158	7	2026-01-12 18:37:06.967486
782	158	8	2026-01-12 18:37:06.967486
783	159	1	2026-01-12 18:37:10.162069
784	159	7	2026-01-12 18:37:10.162069
785	159	2	2026-01-12 18:37:10.162069
786	159	8	2026-01-12 18:37:10.162069
787	159	9	2026-01-12 18:37:10.162069
\.


--
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: breanna.white
--

COPY public.episodes (id, title, episode_number, description, created_at, release_date) FROM stdin;
151	Episode 17 - Dark Souls III	17	\N	2026-01-12 18:36:17.06876	May 13, 2016
152	Episode 18 - Vloggers	18	\N	2026-01-12 18:36:26.578016	May 23, 2016
153	Episode 19 - Selling Out	19	\N	2026-01-12 18:36:33.488832	May 29, 2016
154	Episode 20 - Plebs	20	\N	2026-01-12 18:36:40.860758	May 06, 2016
155	Episode 21 - Sleep	21	\N	2026-01-12 18:36:47.976138	December 06, 2016
7	Episode 2 - Waifus	2	\N	2026-01-06 11:54:09.347091	March 01, 2016
1	Episode 1 - Best Game Ever	1	This episode we talk about the concept of a best game ever, what it means, and if it can even really exist.	2026-01-06 10:44:25.479705	December 23, 2015
6	Episode 16 - Memes That Need To Die	16	Fuck it. This is terrible.	2026-01-06 11:39:10.620044	May 6, 2016
8	Episode 3 - Steven Universe	3	\N	2026-01-06 11:55:52.530756	October 01, 2016
9	Episode 4 - 2deep4u	4	\N	2026-01-12 18:26:02.882613	January 17, 2016
10	Episode 5 - HYPE	5	\N	2026-01-12 18:28:13.736704	January 25, 2016
11	Episode 6 - Remakes	6	\N	2026-01-12 18:28:17.469209	January 02, 2016
12	Episode 7 - Reviewer Rules	7	\N	2026-01-12 18:28:52.98552	August 01, 2016
13	Episode 8 - Procrastination	8	\N	2026-01-12 18:29:03.83334	February 14, 2016
14	Episode 9 - Fanart	9	\N	2026-01-12 18:29:09.718036	February 22, 2016
15	Episode 10 - Authorial Intent	10	\N	2026-01-12 18:29:13.217827	February 28, 2016
16	Episode 11 - Porn	11	\N	2026-01-12 18:30:21.210267	July 03, 2016
17	Episode 12 - Effort	12	\N	2026-01-12 18:30:33.016791	March 20, 2016
18	Episode 13 - FUCKING NORMIES REEEEEEEE!	13	\N	2026-01-12 18:30:45.272776	March 29, 2016
19	Episode 14 - Commenter Rules	14	\N	2026-01-12 18:30:54.577045	March 03, 2016
20	Episode 15 - Influences	15	\N	2026-01-12 18:30:57.234328	March 23, 2016
156	Episode 22 - School Sucks	22	\N	2026-01-12 18:36:54.286054	June 19, 2016
157	Episode 23 - Never Going Outside	23	\N	2026-01-12 18:36:59.823309	June 26, 2016
158	Episode 24 - Things We Can't Get Into	24	\N	2026-01-12 18:37:06.967486	July 01, 2016
159	Episode 25 - Witty Banter	25	\N	2026-01-12 18:37:10.162069	July 17, 2016
\.


--
-- Data for Name: hosts; Type: TABLE DATA; Schema: public; Owner: breanna.white
--

COPY public.hosts (id, name, created_at) FROM stdin;
1	Nate	2026-01-06 10:40:08.632448
2	Ben	2026-01-06 10:40:08.658327
3	Digibro	2026-01-06 10:40:08.661646
4	Hippo	2026-01-06 10:40:08.664952
5	Jesse	2026-01-06 10:40:08.667162
6	Mage	2026-01-06 10:40:08.66872
7	Tom	2026-01-06 10:40:08.674951
8	The Davoo	2026-01-06 10:40:08.676667
9	Mother's Basement	2026-01-06 10:40:08.678051
10	Munchy	2026-01-06 10:40:08.681949
11	Mumkey Jones	2026-01-06 10:40:08.685499
\.


--
-- Name: episode_hosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: breanna.white
--

SELECT pg_catalog.setval('public.episode_hosts_id_seq', 787, true);


--
-- Name: episodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: breanna.white
--

SELECT pg_catalog.setval('public.episodes_id_seq', 159, true);


--
-- Name: hosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: breanna.white
--

SELECT pg_catalog.setval('public.hosts_id_seq', 11, true);


--
-- Name: episode_hosts episode_hosts_episode_id_host_id_key; Type: CONSTRAINT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.episode_hosts
    ADD CONSTRAINT episode_hosts_episode_id_host_id_key UNIQUE (episode_id, host_id);


--
-- Name: episode_hosts episode_hosts_pkey; Type: CONSTRAINT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.episode_hosts
    ADD CONSTRAINT episode_hosts_pkey PRIMARY KEY (id);


--
-- Name: episodes episodes_pkey; Type: CONSTRAINT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id);


--
-- Name: hosts hosts_name_key; Type: CONSTRAINT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT hosts_name_key UNIQUE (name);


--
-- Name: hosts hosts_pkey; Type: CONSTRAINT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT hosts_pkey PRIMARY KEY (id);


--
-- Name: idx_episode_hosts_episode_id; Type: INDEX; Schema: public; Owner: breanna.white
--

CREATE INDEX idx_episode_hosts_episode_id ON public.episode_hosts USING btree (episode_id);


--
-- Name: idx_episode_hosts_host_id; Type: INDEX; Schema: public; Owner: breanna.white
--

CREATE INDEX idx_episode_hosts_host_id ON public.episode_hosts USING btree (host_id);


--
-- Name: episode_hosts episode_hosts_episode_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.episode_hosts
    ADD CONSTRAINT episode_hosts_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES public.episodes(id) ON DELETE CASCADE;


--
-- Name: episode_hosts episode_hosts_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: breanna.white
--

ALTER TABLE ONLY public.episode_hosts
    ADD CONSTRAINT episode_hosts_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.hosts(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict pTiQhOjfrSzdZcOCTpNyhYDVtaMLGJfyScGJczGc5Zz24ry9j9w4VOT1ocJfzbj

