import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button as MaterialBtn } from '@mui/material';
import { SearchBox, SearchResultBox, UserImage } from '../../../styled__components/home';
import { searchUserwithParam } from '../../../src/Fetch/SearchUserReq/GETsearchedReg';
import { Button, Input } from '../../../styled__components/common';
import { userAgent, userAgentFromString } from 'next/server';
import { SearchedUser } from '../../../src/utils/types';
import { POSTGroupChat } from '../../../src/Fetch/Chat/POSTGroupChat';

const style = {
    position: 'absolute' as 'absolute',
    color: "black",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: "5px",
    pt: 2,
    px: 4,
    pb: 3,
}

type Props = {
    setFetchAgain:Function;
}

export default function NestedModal({setFetchAgain}:Props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [users, setUsers] = React.useState<string[]>([])
    const [chatName, setChatName] = React.useState<string>("")
    const [searchUsers, setSearchUsers] = React.useState<SearchedUser[]>([]);
    const [names, setNames] = React.useState<string[]>([])

    let timeout: ReturnType<typeof setTimeout>;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            if (e.target.value) {
                searchUserwithParam(e.target.value, setSearchUsers);
            } else {
                setSearchUsers([]);
            }
        }, 1500);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Make a post request for creating group
        POSTGroupChat(users,chatName,setFetchAgain,handleClose)
    }

    return (
        <div>
            <MaterialBtn onClick={handleOpen}>+ Create Group</MaterialBtn>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400, height: "fit-content" }}>
                    <h2 id="parent-modal-title">Create Group</h2>
                    <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                        <Input type="text" w='100%' placeholder='Group Name' name="name" onChange={(e) => setChatName(e.target.value)} />
                        <Input
                            placeholder="Search user..."
                            w="100%"
                            onChange={(e) => handleSearch(e)}
                        />
                        {searchUsers.length > 0 && (
                            <Box border={"1px solid gray"}>
                                {searchUsers.map((elem, i) => (
                                    <div
                                        onClick={() => {
                                            setUsers([...users, elem._id])
                                            setSearchUsers([]);
                                            setNames([...names, elem.username])
                                        }}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: 6,
                                            margin: 1,
                                            borderBottom: "1px solid gray"
                                        }}
                                        key={elem._id}
                                    >
                                        {elem.username}
                                        <UserImage src={elem.profile_avatar_url} alt="myprofile" />
                                    </div>
                                ))}
                            </Box>
                        )}
                        {names.length > 0 && <Box marginY={"10px"}>{names.map((e, i) => {
                            return <span style={{ backgroundColor: "lightgray", border: "1px solid gray", borderRadius: "10px", padding: "3px" }} key={i} onClick={() => {
                                setUsers(prev => prev.filter(el => el != users[i]))
                                setNames(prev => prev.filter(n => n != e))
                            }} >{e} x</span>
                        })}</Box>}
                        <Button type='submit'>Create</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
