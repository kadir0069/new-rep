

// Blog data structure
let blogs = [];

// Initialize with sample data if none exists
function initializeBlogs() {
    if(!localStorage.getItem('blogs')) {
        blogs = [
            {
                id: '1',
                title: "The Importance of Regular Health Checkups",
                date: "2023-06-15",
                author: "Dr. Sarah Johnson",
                image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                excerpt: "Discover why routine health screenings are crucial for early detection of potential health issues and maintaining overall wellness.",
                content: "<p>Regular health checkups, also known as preventive health screenings, are routine visits to a healthcare provider to assess your overall health. These checkups typically include:</p>",
                authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                authorBio: "Radiologist with 12 years of experience specializing in diagnostic imaging interpretation including X-rays, CT scans, and MRIs."
            },
            {
                id: '2',
                title: "Understanding Your Blood Test Results",
                date: "2023-05-28",
                author: "Dr. Michael Chen",
                image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                excerpt: "A comprehensive guide to interpreting common blood test markers and what they reveal about your health.",
                content: "<p>Regular health checkups, also known as preventive health screenings, are routine visits to a healthcare provider to assess your overall health. These checkups typically include:</p>",
                authorImage: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                authorBio: "Pathologist with 15 years of experience in laboratory analysis of bodily fluids and tissues."
            }
        ];
        localStorage.setItem('blogs', JSON.stringify(blogs));
    } else {
        blogs = JSON.parse(localStorage.getItem('blogs'));
    }
}

// Load all blogs and display them
function loadBlogs() {
    initializeBlogs();
    const container = document.getElementById('blog-container');
    container.innerHTML = '';
    
    blogs.forEach(blog => {
        const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        container.innerHTML += `
            <div class="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300" data-id="${blog.id}">
                <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex items-center text-sm text-gray-500 mb-3">
                        <span>${formattedDate}</span>
                        <span class="mx-2">•</span>
                        <span>${blog.author}</span>
                    </div>
                    <h3 class="text-xl font-bold text-dark mb-3">${blog.title}</h3>
                    <p class="text-gray-600 mb-4">${blog.excerpt}</p>
                    <a href="blog-template.html?id=${blog.id}" class="text-primary font-semibold hover:text-secondary transition duration-300 inline-flex items-center">
                        Read More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                    <div class="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
                        <button onclick="editBlog('${blog.id}')" class="text-blue-500 hover:text-blue-700">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteBlog('${blog.id}')" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Show the add/edit form
function showAddForm() {
    document.getElementById('blog-form').classList.remove('hidden');
    document.getElementById('post-form').reset();
    document.getElementById('post-id').value = '';
}

// Edit an existing blog
function editBlog(id) {
    const blog = blogs.find(b => b.id === id);
    if(blog) {
        document.getElementById('post-id').value = blog.id;
        document.getElementById('post-title').value = blog.title;
        document.getElementById('post-author').value = blog.author;
        document.getElementById('post-date').value = blog.date;
        document.getElementById('post-image').value = blog.image;
        document.getElementById('post-excerpt').value = blog.excerpt;
        document.getElementById('post-content').value = blog.content;
        document.getElementById('blog-form').classList.remove('hidden');
    }
}

// Save a blog post (add new or update existing)
function savePost() {
    const id = document.getElementById('post-id').value || Date.now().toString();
    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const date = document.getElementById('post-date').value;
    const image = document.getElementById('post-image').value;
    const excerpt = document.getElementById('post-excerpt').value;
    const content = document.getElementById('post-content').value;
    
    if(!title || !author || !date || !image || !excerpt || !content) {
        alert('Please fill in all fields');
        return;
    }
    
    const existingIndex = blogs.findIndex(b => b.id === id);
    const newBlog = {
        id,
        title,
        author,
        date,
        image,
        excerpt,
        content,
        authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        authorBio: `${author} with expertise in diagnostic medicine.`
    };
    
    if(existingIndex >= 0) {
        blogs[existingIndex] = newBlog;
    } else {
        blogs.push(newBlog);
    }
    
    localStorage.setItem('blogs', JSON.stringify(blogs));
    cancelEdit();
    loadBlogs();
}

// Delete a blog post
function deleteBlog(id) {
    if(confirm('Are you sure you want to delete this blog post?')) {
        blogs = blogs.filter(b => b.id !== id);
        localStorage.setItem('blogs', JSON.stringify(blogs));
        loadBlogs();
    }
}

// Cancel editing
function cancelEdit() {
    document.getElementById('blog-form').classList.add('hidden');
    document.getElementById('post-form').reset();
}