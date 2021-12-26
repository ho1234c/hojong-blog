import { useEffect, useState } from 'react';
import { MarkdownRemark } from '@grpaphql-types';
import { sessionStorage } from '@src/utils/window';

const STORAGE_KEY = 'hojong-blog:tag';

export const usePosts = (nodes: MarkdownRemark[]) => {
  const [postList, setPostList] = useState(nodes);
  const [fillteredPostList, setFillteredPostList] = useState(postList);
  const [tagList, setTagList] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    const selectedTag = sessionStorage.getItem(STORAGE_KEY);

    if (selectedTag) {
      setSelectedTag(selectedTag);
    }
  }, []);

  useEffect(() => {
    if (!nodes) return;

    const tagList = Array.from(new Set(nodes.flatMap((node) => node.frontmatter?.tags).flat())).filter(
      Boolean,
    ) as string[];

    setPostList(nodes);
    setTagList(tagList);
  }, [nodes]);

  const handleSelectTag = (tag: string) => {
    sessionStorage.setItem(STORAGE_KEY, tag);
    setSelectedTag(tag);
    setFillteredPostList(postList.filter((post) => (tag ? post.frontmatter?.tags?.includes(tag) : true)));
  };

  return {
    postList: fillteredPostList,
    tagList,
    handleSelectTag,
    selectedTag,
  };
};
