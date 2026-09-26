export interface Blog {
  id: string | number;
  title: string;
  author: string;
  url: string;
  likes: number;
}

const initialBlogs: Blog[] = [
  {
    id: 1,
    title: "React Patterns and Best Practices",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
  {
    id: 3,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: 4,
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
];

let blogs: Blog[] = [...initialBlogs];

export async function getBlogs(): Promise<Blog[]> {
  return blogs;
}

export async function getBlogsSortedByLikes(): Promise<Blog[]> {
  return [...blogs].sort((a, b) => b.likes - a.likes);
}

export async function searchBlogs(titleQuery?: string): Promise<Blog[]> {
  const sorted = await getBlogsSortedByLikes();
  if (!titleQuery || !titleQuery.trim()) {
    return sorted;
  }
  const term = titleQuery.toLowerCase().trim();
  return sorted.filter((blog) => blog.title.toLowerCase().includes(term));
}



export async function getBlogById(id: string | number): Promise<Blog | undefined> {
  return blogs.find((blog) => String(blog.id) === String(id));
}

export async function createBlog(data: { title: string; author: string; url: string }): Promise<Blog> {
  const newBlog: Blog = {
    id: Date.now().toString(),
    title: data.title,
    author: data.author,
    url: data.url,
    likes: 0,
  };
  blogs.push(newBlog);
  return newBlog;
}

export async function likeBlog(id: string | number): Promise<Blog | undefined> {
  const blog = blogs.find((b) => String(b.id) === String(id));
  if (blog) {
    blog.likes += 1;
    return blog;
  }
  return undefined;
}

