import {
  Input,
  Image,
  Spinner,
  Spacer,
  Textarea,
  Container,
  VStack,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  AccordionPanel,
  Accordion,
  Select,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { updatePost, removePost } from '../redux/actions/blogPostActions';
import ImageUpload from './ImageUpload';
import { useDispatch, useSelector } from 'react-redux';

const PostEdit = ({ _id, contentOne, contentTwo, title, category, image }) => {
  const [postContentOne, setPostContentOne] = useState(contentOne);
  const [postContentTwo, setPostContentTwo] = useState(contentTwo);
  const [postTitle, setPostTitle] = useState(title);
  const [postImage, setPostImage] = useState(image);
  const [postCategory, setPostCategory] = useState(category);

  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { updateButtonLoading, removeButtonLoading } = blogPostInfo;

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      updatePost({
        _id,
        contentOne: postContentOne,
        contentTwo: postContentTwo,
        title: postTitle,
        category: postCategory,
        image: postImage,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removePost(_id));
  };

  return (
    <Container maxW='5xl'>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb='4'>
            <VStack direction={{ base: 'column', lg: 'row' }} spacing='7'>
              <Image src={postImage} minW={{ lg: '400px' }} maxH='280px' fit='contain' />
              <ImageUpload setPostImage={setPostImage} />
              <Input value={postTitle} onChange={(e) => setPostTitle(e.target.value)} size='sm' mb='3' />
              <Select
                defaultValue={postCategory.charAt(0).toUpperCase() + postCategory.slice(1)}
                size='sm'
                onChange={(e) => setPostCategory(e.target.value)}>
                <option value='Europe'>Europe</option>
                <option value='Asia'>Asia</option>
                <option value='Oceania'>Oceania</option>
                <option value='America'>America</option>
                <option value='Africa'>Africa</option>
              </Select>
              <Textarea
                value={postContentOne}
                noOfLines='5'
                fontSize='lg'
                onChange={(e) => setPostContentOne(e.target.value)}
              />
              <Textarea
                value={postContentTwo}
                noOfLines='5'
                fontSize='lg'
                onChange={(e) => setPostContentTwo(e.target.value)}
              />
              <Spacer />
            </VStack>
            <Button
              loadingText='Updating Post...'
              isLoading={updateButtonLoading}
              minW={{ base: 'full', md: '140px' }}
              colorScheme='green'
              mr={{ md: '10' }}
              onClick={() => handleSave()}>
              Save
            </Button>
            <Button
              loadingText='Removing Post...'
              isLoading={removeButtonLoading}
              minW={{ base: 'full', md: '140px' }}
              colorScheme='red'
              mt={{ base: '10', md: '0' }}
              onClick={() => handleRemove()}>
              Remove Post
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default PostEdit;
