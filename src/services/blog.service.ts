import BlogModel, { Blog } from '../models/blog.model';

//Create blog service
export const createBlog = async (input: Partial<Blog>) => {
	const blog = await BlogModel.create(input);
	return blog.toJSON();
};

export const findAllBlogs = async () => {
	return await BlogModel.find();
};

export const findBlogById = async (id: string) => {
	return await BlogModel.findById(id);
};

export const updateBlogById = async (id: string, input: Partial<Blog>) => {
	return await BlogModel.findByIdAndUpdate(id, input, { new: true });
};
