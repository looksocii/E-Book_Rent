CREATE TABLE booklist (
    book_id integer NOT NULL,
    title character varying(255),
    author character varying(255),
    short_title text,
    img_book character varying(255),
    price_rent real,
    category_id integer
);

CREATE TABLE category (
    id integer NOT NULL,
    content character varying(255)
);

CREATE TABLE payment (
    id integer NOT NULL,
    date_time date,
    exp_date date,
    total_price double precision,
    useraccount_id integer,
    booklist_id integer
);

CREATE TABLE useraccount (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    username character varying(255),
    password character varying(255),
    email character varying(255),
    phone character(10),
    imguserurl character varying(255)
);

INSERT INTO category (id, content)
VALUES (1, 'Romance'),
(2, 'Travel'),
(3, 'History'),
(4, 'Biographies'),
(5, 'Arts & Photography'),
(6, 'Business & Money');

INSERT INTO booklist (book_id, title, author, short_title, img_book, price_rent, category_id)
VALUES (1, 'The Whispers of War', 'Julia Kelly', 'For fans of historical novels by Kristin Harmel and Martha Hall Kelly comes a “gripping tale by a writer at the top of her game” (Fiona Davis, author of The Chelsea Girls) following three friends who struggle to remain loyal as one of them is threatened with internment by the British government at the start of World War II.', 'https://m.media-amazon.com/images/I/41R56akVBQL.jpg', 8.9, 1),
(2, 'A Broken Bone', 'Melinda Leigh', 'The mysterious death of a local teen leads to a hunt for a killer in the sixth Widow’s Island novella by #1 Wall Street Journal bestselling author Melinda Leigh.', 'https://m.media-amazon.com/images/I/41QCv8-P4JL.jpg', 7.8, 1),
(3, 'This Is Not How It Ends', 'Rochelle B. Weinstein', 'From USA Today bestselling author Rochelle B. Weinstein comes a moving novel of hearts lost and found, and of one woman torn between two love stories.', 'https://m.media-amazon.com/images/I/41T8qweuQnL.jpg', 7.5, 1),
(4, 'The Last Sister', 'Kendra Elliot', 'Three sisters’ secrets collide in a shocking novel of suspense by the bestselling author of the Mercy Kilpatrick series.', 'https://m.media-amazon.com/images/I/4128YGmVaoL._SY346_.jpg', 6.6, 1),
(5, 'The Return', 'Nicholas Sparks', 'In the romantic tradition of Dear John, Nicholas Sparks returns with the story of an injured Navy doctor -- and two women whose secrets will change the course of his life in this #1 New York Times bestseller.', 'https://images-na.ssl-images-amazon.com/images/I/51Y2VGacBDL._SX327_BO1,204,203,200_.jpg', 9.9, 1),
(6, 'An Unfinished Story: A Novel', 'Boo Walker', 'A grieving widow and a disenchanted writer form an unexpected bond in a novel about second chances and finding the courage to let go of the past.', 'https://m.media-amazon.com/images/I/41GZousIbIL.jpg', 7.9, 1),
(7, 'Maybe it is Fate', 'Weston Parker', 'A fighter pilot with no plane to fly is a very unhappy boy. So commercial airlines, here I come.', 'https://m.media-amazon.com/images/I/419lRWrZVxL._SY346_.jpg', 10.2, 1),
(8, 'Clanlands', 'Sam Heughan', 'From their faithful camper van to boats, kayaks, bicycles, and motorbikes, join stars of Outlander Sam and Graham on a road trip with a difference, as two Scotsmen explore a land of raw beauty, poetry, feuding, music, history, and warfare.', 'https://images-na.ssl-images-amazon.com/images/I/51D3JeU5XgL._SX323_BO1,204,203,200_.jpg', 5.6, 2),
(9, 'BAD KARMA', 'Paul Wilson', 'In the summer of 1978, twenty-one-year-old Paul Wilson jumps at the chance to join two local icons on a dream surf trip to mainland Mexico, unaware their ultimate destination lies in the heart of drug cartel country. Having no earthly idea of where he’ll get the money to pay his share, and determined to prove his mettle, he does the only thing he can think of: He robs a supermarket. And, if karma didn’t already have enough reason to doom the trip.', 'https://m.media-amazon.com/images/I/51wwuFAg1pL.jpg', 8.8, 2),
(10, 'Mountain of the Dead', 'Keith McCloskey', 'In January 1959, ten experienced young skiers set out for Mount Otorten in the far north of Russia. While one of the skiers fell ill and returned., the remaining nine lost their way and ended up on another mountain slope known as Kholat Syakhl (or ‘Mountain of the Dead’).', 'https://m.media-amazon.com/images/I/51ZSHn57d8L._SY346_.jpg', 8.8, 2),
(11, 'Let Them Eat Pancakes', 'Craig Carlson', 'A second helping of tales on the joys and challenges of working, eating, and loving in France from the New York Times bestselling author of Pancakes in Paris.', 'https://m.media-amazon.com/images/I/51psDTJOttL._SY346_.jpg', 10.2, 2),
(12, 'This Is Cuba', 'David Ariosto', 'Fidel Castro is dead. Donald Trump was elected president. And to most outsiders, the fate of Cuba has never seemed more uncertain. Yet those who look close enough may recognize that signs of the next revolution are etched in plain view.', 'https://m.media-amazon.com/images/I/51OM2j0n35L.jpg', 9.9, 2),
(13, 'A Promised Land', 'Barack Obama', 'A riveting, deeply personal account of history in the making—from the president who inspired us to believe in the power of democracy.', 'https://images-na.ssl-images-amazon.com/images/I/41L5qgUW2fL._SX327_BO1,204,203,200_.jpg', 8.2, 3),
(14, 'The Answer Is . . . ', 'Alex Trebek', 'A RECOMMENDED SUMMER READ BY THE NEW YORK TIMES, USA TODAY, TIME, AND NEWSWEEK.', 'https://images-na.ssl-images-amazon.com/images/I/41agWXl9gBL._SX331_BO1,204,203,200_.jpg', 7.7, 3),
(15, 'Untamed', 'Glennon Doyle', 'In her most revealing and powerful memoir yet, the activist, speaker, bestselling author, and “patron saint of female empowerment” (People) explores the joy and peace we discover when we stop striving to meet others’ expectations and start trusting the voice deep within us.', 'https://images-na.ssl-images-amazon.com/images/I/51m7MVU4OWL._SX329_BO1,204,203,200_.jpg', 11, 3),
(16, 'Blackout', 'Candace Owens', 'Political activist and social media star Candace Owens addresses the many ways that Democrat Party policies hurt, rather than help, the African American community, and why she and many others are turning right.', 'https://images-na.ssl-images-amazon.com/images/I/41agPRj7A2L._SX324_BO1,204,203,200_.jpg', 9.9, 3),
(17, 'The Sentinel', 'Lee Child', '“One of the many great things about Jack Reacher is that he’s larger than life while remaining relatable and believable. The Sentinel shows that two Childs are even better than one.”—James Patterson', 'https://images-na.ssl-images-amazon.com/images/I/51ugn9Gi1GL._SX325_BO1,204,203,200_.jpg', 7.7, 3),
(18, 'Pappyland', 'Wright Thompson', 'The story of how Julian Van Winkle III, the caretaker of the most coveted cult Kentucky Bourbon whiskey in the world, fought to protect his family is heritage and preserve the taste of his forebears, in a world where authenticity, like his product, is in very short supply.', 'https://images-na.ssl-images-amazon.com/images/I/51rGLAR2ruL._SX329_BO1,204,203,200_.jpg', 7.7, 4),
(19, 'The Pale-Faced Lie', 'David Crow', 'Spur Award Winner for Best Western First Nonfiction Book • Spur Award Finalist for Best Western Contemporary Nonfiction • IPPY Silver Award for Best Memoir • Next Generation Indie Award for Best Memoir (Overcoming Adversity) • International Book Award for Best True Crime • Readers’ Favorite Gold Medal, Nonfiction Drama', 'https://m.media-amazon.com/images/I/51gQxIh+1PL._SY346_.jpg', 12, 4),
(20, 'My Own Words', 'Ruth Bader Ginsburg', 'The New York Times bestselling book from Supreme Court Justice Ruth Bader Ginsburg—“a comprehensive look inside her brilliantly analytical, entertainingly wry mind, revealing the fascinating life of one of our generation is most influential voices in both law and public opinion” (Harper’s Bazaar).', 'https://images-na.ssl-images-amazon.com/images/I/51g3QAQ772L._SX326_BO1,204,203,200_.jpg', 7.2, 4),
(21, 'Dolly Parton, Songteller', 'Dolly Parton', 'Dolly Parton, Songteller: My Life in Lyrics is a landmark celebration of the remarkable life and career of a country music and pop culture legend.', 'https://images-na.ssl-images-amazon.com/images/I/51qJ4+9+OvL._SX377_BO1,204,203,200_.jpg', 9.9, 4),
(22, 'Jew(ish)', 'Matt Greene', 'What does it mean to be Jew(ish) in 2020? Caught between tradition and modernity, between a Jewish family and a non-Jewish son, Matt Greene ponders the big questions concerning identity, religion, family and Seinfeld.', 'https://m.media-amazon.com/images/I/419Zn3Tc7sL._SY346_.jpg', 6.5, 4),
(23, 'I Would Leave Me If I Could.', 'Halsey', 'Grammy Award–nominated, platinum-selling musician Halsey is heralded as one of the most compelling voices of her generation. In I Would Leave Me If I Could, she reveals never-before-seen poetry of longing, love, and the nuances of bipolar disorder.', 'https://images-na.ssl-images-amazon.com/images/I/51zrwNV+wZL._SX327_BO1,204,203,200_.jpg', 5.5, 5),
(24, 'Born a Crime', 'Trevor Noah', 'Trevor Noah’s unlikely path from apartheid South Africa to the desk of The Daily Show began with a criminal act: his birth. Trevor was born to a white Swiss father and a black Xhosa mother at a time when such a union was punishable by five years in prison. Living proof of his parents’ indiscretion, Trevor was kept mostly indoors for the earliest years of his life, bound by the extreme and often absurd measures his mother took to hide him from a government that could, at any moment, steal him away. Finally liberated by the end of South Africa’s tyrannical white rule, Trevor and his mother set forth on a grand adventure, living openly and freely and embracing the opportunities won by a centuries-long struggle.', 'https://images-na.ssl-images-amazon.com/images/I/5102ogTDCGL._SX331_BO1,204,203,200_.jpg', 9.9, 5),
(25, 'Who Is Alex Trebek?', 'Lisa Rogak', 'After a contestant wrote “We love you, Alex!” as his Final Jeopardy! answer, fans around the world quickly chimed in to proclaim their own love and support for beloved Jeopardy! host Alex Trebek. In the wake of his devastating cancer diagnosis, the moment provided the perfect opportunity to reflect on what the show ― and the man – meant to them.', 'https://images-na.ssl-images-amazon.com/images/I/41BaF0hWazL._SX327_BO1,204,203,200_.jpg', 8.2, 5),
(26, 'Break It Up', 'Richard Kreitner', 'From journalist and historian Richard Kreitner, a "powerful revisionist account" of the most persistent idea in American history: these supposedly United States should be broken up (Eric Foner).', 'https://m.media-amazon.com/images/I/51C7RHrbXZL.jpg', 8.8, 5),
(27, 'The Obstacle Is the Way', 'Ryan Holiday', 'Its many fans include a former governor and movie star (Arnold Schwarzenegger), a hip hop icon (LL Cool J), an Irish tennis pro (James McGee), an NBC sportscaster (Michele Tafoya), and the coaches and players of winning teams like the New England Patriots, Seattle Seahawks, Chicago Cubs, and University of Texas men’s basketball team.', 'https://m.media-amazon.com/images/I/51R9k3G0+ZL.jpg', 8.9, 6),
(28, 'Think and Grow Rich', 'Napoleon Hill', 'Think and Grow Rich has been called the "Granddaddy of All Motivational Literature." It was the first book to boldly ask, "What makes a winner?" The man who asked and listened for the answer, Napoleon Hill, is now counted in the top ranks of the world is winners himself.', 'https://images-na.ssl-images-amazon.com/images/I/61y04z8SKEL._SX349_BO1,204,203,200_.jpg', 6.6, 6),
(29, 'The Intelligent Investor', 'Benjamin Graham', 'The greatest investment advisor of the twentieth century, Benjamin Graham, taught and inspired people worldwide. Graham is philosophy of "value investing" -- which shields investors from substantial error and teaches them to develop long-term strategies -- has made The Intelligent Investor the stock market bible ever since its original publication in 1949.', 'https://images-na.ssl-images-amazon.com/images/I/51fESaIGgVL._SX323_BO1,204,203,200_.jpg', 9.9, 6),
(30, 'Free to Focus', 'Michael Hyatt', 'Everyone gets 168 hours a week, but it never feels like enough, does it? Work gobbles up the lion is share--many professionals are working as much as 70 hours a week--leaving less and less for rest, exercise, family, and friends. You know, all those things that make life great.', 'https://m.media-amazon.com/images/I/41hB8tNqA9L.jpg', 4.9, 6),
(31, 'Leadership', 'Doris Kearns Goodwin', 'The New York Times bestselling book about the early development, growth, and exercise of leadership from Pulitzer Prize-winning author Doris Kearns Goodwin “should help us raise our expectations of our national leaders, our country, and ourselves” (The Washington Post).', 'https://m.media-amazon.com/images/I/41H9mz6BWTL.jpg', 11.2, 6),
(32, 'Who Not How', 'Dan Sullivan', 'Have you ever had a new idea or a goal that excites you... but not enough time to execute it? What about a goal you really want to accomplish...but can not because instead of taking action, you procrastinate? Do you feel like the only way things are going to get done is if you do them? But what if it was not that way? What if you had a team of people around you that helped you accomplish your goals (while you helped them accomplish theirs)?', 'https://m.media-amazon.com/images/I/41JOiTSR-PL.jpg', 12, 6);