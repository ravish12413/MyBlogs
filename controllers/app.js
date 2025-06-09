const db = require('../config/firebase-config');

const addPost = async (req, res) => {
  try {
    const { domain, title, content } = req.body;

    if (!domain || !title || !content) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newPost = {
      domain,
      title,
      content,
      createdAt: new Date()
    };

    await db.collection('posts').add(newPost);
    return res.status(200).json({ success: true, message: 'Post published successfully!' });
  } catch (error) {
    console.error('Error adding post:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getLatestPosts = async (req, res) => {
  try {
    const snapshot = await db
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(3)
      .get();

    const posts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        title: data.title,
        domain: data.domain,
        content: data.content,
        createdAt: data.createdAt.toDate(), // Convert Firestore timestamp
      };
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    res.status(500).json({ error: 'Failed to fetch recent posts' });
  }
};

const getFilteredPosts = async (req, res) => {
  try {
    const { domain } = req.query;

    let query = db.collection('posts').orderBy('createdAt', 'desc');

    if (domain) {
      query = query.where('domain', '==', domain);
    }

    const snapshot = await query.get();

    const posts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        domain: data.domain,
        content: data.content,
        createdAt: data.createdAt.toDate()
      };
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};


module.exports = { addPost, getLatestPosts , getFilteredPosts };
