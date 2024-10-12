/* eslint-disable react/prop-types */
// making a form in such a way that both update and create post is done by same form

import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "../index"
import { postServices } from "../../appwrite/index"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

// post in props gives value of post in case of updation
function PostForm({ post }) {

  const navigate = useNavigate();

  // watch can continuous moniter given field
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    // if post has already data then its update so default value is post's past value else empty for all
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  });

  // get userdata from store using useSelector
  const userData = useSelector(state => state.auth.userData)

  // handle form submit for update and create
  const submit = async (data) => {
    console.log(data)
    // updation case if post is exsist
    if (post) {
      // uploading new file
      let file = null;
      if (data.featuredImage && data.featuredImage.length > 0) {
        file = await postServices.uploadFile(data.featuredImage[0]);
      }
      // deleting old file
      if (file) {
        postServices.deleteFile(post.featuredImage)
      }

      // updating post
      const updatedPost = await postServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      })

      // navigate to updated post
      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`)
      }

    }
    // creation case
    else {
      // Creation case
      if (!data.featuredImage || data.featuredImage.length === 0) {
        console.error("Featured image is required");
        return;
      }

      const file = await postServices.uploadFile(data.featuredImage[0]);

      if (!file) {
        console.error("Failed to upload file");
        return;
      }

      // creating post
      const createdPost = await postServices.createPost({
        ...data,
        featuredImage: file.$id,
        userId: userData.$id
      })
      // navigate to created post
      if (createdPost) {
        navigate(`/post/${createdPost.$id}`)
      }
    }
  }

  // slug transformation (useCallback=>cache memory so no need to re generate it)
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return ''
  }, [])

  // update slug when title changes
  useEffect(() => {

    // this method provide by react=hhok-from
    // value => current value of the current field
    // name =>  name of the current field
    // watch method watch all the register in form

    const subscription = watch((value, { name }) => {
      // if register name is title while watching by watch then slug updates
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe(); //* for memory optimization provided by useEffect for every function not only for watch (it helps useEffect to not lies in loop)
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* first section which includes title, slug, RTE */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          //TODO: disabled={true}
          // if user manually enter slug then this code  will be executed and update slug
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>

      {/* second section which includes featured image, file preview, status and submit nutton */}

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={postServices.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" text={post ? "Update" : "Submit"} />
      </div>
    </form>
  )
}

export default PostForm