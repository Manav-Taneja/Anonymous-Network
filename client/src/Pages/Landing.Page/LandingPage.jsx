import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import PostComponent from '../../Components/Post.Component/Post.Component'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import SkeletonLandingPost from '../../Components/Skeleton.Component/Skeleton.Landing.Post.Component'
import { PostsContext } from '../../State/PostsContext'
import {  useToast } from '@chakra-ui/toast'
import { AuthContext } from '../../State/AuthContext'
import { ImSpinner2 } from 'react-icons/im'
import { Select } from "@chakra-ui/react"
import { Link, useHistory } from 'react-router-dom'

const LandingPage = () => {
  const toast = useToast()
  const { url } = useContext(AuthContext)
  const { getPostsFunction, posts, setPosts } = useContext(PostsContext)

  const [loading, isLoading] = useState(true)
  const[gen,setGen]=useState('');
  const[remove,setRemove]=useState(false);

  const [offset, setOffset] = useState(1)
  const [fetching, setFetching] = useState(false)
  const [flair, setFlair] = useState('Filters')
  const flairOptions = [
    {value:"Filters", label:'Filters'},
    {value: "Tech", label: "Tech"},
    {value: "Finance", label: "Finance"},
    {value: "Hardware & Semiconductor", label: "Hardware & Semiconductor"},
    {value: "E-Commerce & Retail", label: "E-Commerce & Retail"},
    {value: "Gaming", label: "Gaming"},
    {value: "Auto", label: "Auto"},
    {value: "Media & Entertainment", label: "Media & Entertainment"},
    {value: "Telecom", label: "Telecom"},
    {value: "Health", label: "Health"},
    {value: "Aviation", label: "Aviation"},
    {value:"General" , label: "General"},
    {value:"Software Engineering" , label: "Software Engineering"},
    {value:"Product Management" , label: "Product Management"},
    {value:"Information Technology" , label: "Information Technology"},
    {value:"Data Science & Analytics" , label: "Data Science & Analytics"},
    {value: "Management Consulting" , label:  "Management Consulting"},
    {value:"Design" , label:"Design"},
    {value:"Sales" , label: "Sales"},
    {value:"Security" , label: "Security"},
    {value:"Investment Banking & Sell Side" , label: "Investment Banking & Sell Side"},
    {value: "Marketing" , label:  "Marketing"},
    {value:"Private Equity & Buy Side" , label: "Private Equity & Buy Side"},
    {value:"Corporate Finance" , label: "Corporate Finance"},
    {value:"Supply Chain" , label: "Supply Chain"},
    {value:"Human Resources" , label: "Human Resources"},
    {value:"Operations" , label: "Operations"},
    {value:"Legal" , label: "Legal"},
    {value:"Engineering" , label: "Engineering"},
    {value:"Admin" , label: "Admin"},
    {value:"Customer Service" , label: "Customer Service"},
    {value:"Communications" , label: "Communications"},
    {value:"Return to Office" , label: "Engineering"},
    {value:"Work From Home" , label: "Work From Home"},
    {value:"COVID-19" , label: "COVID-19"},
    {value:"Layoffs" , label: "Layoffs"},
    {value:"Investments & Money" , label: "Investments & Money"},
    {value:"Work Visa" , label: "Engineering"},
    {value:"Housing" , label: "Housing"},
    {value:"Startups" , label: "Startups"},
    {value:"Referrals" , label: "Referrals"},
    {value:"Health Care & Insurance" , label: "Health Care & Insurance"},
    {value:"Blockchain & Crypto" , label: "Layoffs"},
    {value:"Travel" , label: "Travel"},
    {value:"Tax" , label: "Tax"},
    {value:"Hobbies & Entertainment" , label: "Hobbies & Entertainment"},
    {value:"IPO" , label: "IPO"},
    {value:"Working Parents" , label: "Working Parents"},
    {value:"Side Jobs" , label: "Side Jobs"},
    {value:"Food & Dining" , label: "Food & Dining"}]
  
  useEffect(() => {
    const fetchPosts = async() => {
      isLoading(true)
      const didGetPosts = getPostsFunction()
      if(didGetPosts){
        isLoading(false)
      }
    }
    fetchPosts()
  }, [])
  // const handleGeneral =(e) =>{
  //   setGen(e.target.value);
  //   }
    const handleApi=async () =>{
      setFetching(false)
      console.log(gen);
      const { data } = await axios.get("/api/posts/filter?flair="+flair)
      console.log(data)
      setPosts([...data.posts])
      if(data.posts.length === 0){
        toast(
          {
            title: "We've reached the end",
            description: "Looks like you've been through all the posts that we have to offer",
            status: "info",
            duration: 9000,
            isClosable: true,
            position: "bottom-right"
          }
        )
      }
      }
      const handleApiPopular=async () =>{
        setFetching(false)
        console.log(gen);
        const { data } = await axios.get("/api/posts/popular")
        console.log(data)
        setPosts([...data.posts])
        if(data.posts.length === 0){
          toast(
            {
              title: "We've reached the end",
              description: "Looks like you've been through all the posts that we have to offer",
              status: "info",
              duration: 9000,
              isClosable: true,
              position: "bottom-right"
            }
          )
        }
        }
  const handleFetchPosts = async() => {
    setOffset(prev => prev+1)
    setFetching(true)
    const { data } = await axios.get(`/api/posts?l=${offset}`)
    setPosts([...posts, ...data.posts])
    data.posts ? setFetching(false) : setFetching(false)
    if(data.posts.length === 0){
      toast(
        {
          title: "We've reached the end",
          description: "Looks like you've been through all the posts that we have to offer",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right"
        }
      )
    }
  }

  
  return (
    <section className="dark:bg-dark-primary font-noto transition-all duration-500 w-full min-h-screen h-full bg-white-bg">
       <div className="flex flex-col text-left my-2">
            {/* <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Filter Post</label> */}
            <Select value={flair} onChange={e => setFlair(e.target.value)} color="white" bg="greenFlair.100" width="45%" marginLeft="70px" borderColor="greenFlair.100">
              {flairOptions.map(flair => <option className="text-black" value={flair.value}>{flair.label}</option>)}
            </Select>
            <ul>
            <li className="dark:text-white mx-2 text-black" style={{width:"100px",marginLeft:"850px",marginTop:"-35px",backgroundColor:"#525FE6",borderRadius:"8px"}}>
                      <button onClick={handleApi}><h1 className='font-bold text-md py-1 px-4  text-white rounded-lg'>Submit</h1></button>
            </li>
            <li className="dark:text-white mx-2 text-black" style={{width:"120px",marginLeft:"1000px",marginTop:"-35px",backgroundColor:"red",borderRadius:"8px",float:"right",marginRight:"70px"}}>
            <button onClick={handleApiPopular}><h1 className='font-bold text-md py-1 px-4 text-white rounded-lg'>Trending</h1></button>
             </li>
            </ul>
          </div>
      <div className="w-11/12 m-auto py-8">
        <div className="w-full ">

          {loading ? 
            (
              <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 1020: 2}}>
                <Masonry gutter="15px">
                    {[1,2,3,4,5,6].map((post) => (
                        <SkeletonLandingPost />
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            ) : (
              <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 1020: 2}}>
                <Masonry gutter="15px">
                    {posts.map((post  ) => (
                        <PostComponent props={post} key={post.post_id} />
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            )
          }
          <div className="flex w-full justify-center">
            <button onClick={handleFetchPosts} className="py-3 px-5 text-sm font-bold rounded-md dark:text-white text-black bg-white shadow-md dark:bg-dark-post mt-10">
              {fetching ? (
                <span className="flex items-center">
                  <ImSpinner2 className="text-white animate-spin mr-2 " />
                  Loading
                </span>
              ) : "Load more"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingPage
