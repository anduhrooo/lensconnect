import React, { useEffect, useState } from "react";
// Imports api fetch functions
import API from "../../utils/API"

function UserInfo(props) {
    // Sets an editing usestate for when the user is editing their profile
    const [editing, setEditing] = useState(false)
    const [newUserObj, setNewUserObj] = useState({})
    const [newUserBio, setNewUserBio] = useState(props.biography)
    const [newWebsite, setNewWebsite] = useState(props.website)
    const [isPhotographer, setIsPhotographer] = useState(props.isPhotographer)
    const [videography, setVideography] = useState(props.videography)

    // Function to refresh the user data to load fresh after each chip is deleted
    const refreshUserData = () => {
        API.getOneUser(props.userId).then((userData) => {
            setNewUserObj(userData);
            console.log("Refreshed Data")
        });
    }

    // UseEffect to run the data refresh on page load
    useEffect(() => {
        if (!props.userId) {
            return
        }
        // Runs the getOneUser function from the API utils page
        refreshUserData()
    }, [props.userId]);


    // Hook to change the users boolian properties on checkbox click
    const toggleIsPhotographer = () => {
        setIsPhotographer(!isPhotographer)
    }
    const toggleVideography = () => {
        setVideography(!videography)
    }

    // Hook to change the editing state that will render the edit version of the page
    const toggelEditing = () => {
        // I set photographer here for cleaner page data load
        setIsPhotographer(newUserObj.isPhotographer)
        setEditing(!editing);
        refreshUserData()
    };


    // Functionality that handles the addition of a specialty
    // Set the useState for the new specialty
    const [newSpec, setNewSpec] = useState("")
    // Function that collects the vale the user writes in the input
    const handleSpecInput = (event) => {
        setNewSpec(event.target.value);
    };
    // Function that runs the APi fetch request from the utils API page
    const addUserSpec = () => {
        // Create an object that includes the logged in userId and the new spec
        const passData = { specialty: newSpec, userId: props.userId }
        API.editUserSpec(passData).then((newData) => {
        });
        refreshUserData()
        refreshUserData()
    };
    // Functionality that handles the deletion of a specialty
    const delUserSpec = (e) => {
        const specId = e.target.id
        // Create an object that includes the logged in userId and the spec
        const passData = { specId: specId, userId: props.userId }
        API.deleteUserSpec(passData).then((newData) => {
        });
        refreshUserData()
        refreshUserData()
    };


    // Functionality that handles the addition of a location
    // Set the useState for the new location
    const [newLoc, setNewLoc] = useState("")
    // Function that collects the vale the user writes in the input
    const handleLocInput = (event) => {
        setNewLoc(event.target.value);
    };
    // Function that runs the APi fetch request from the utils API page
    const addUserLoc = () => {
        // Create an object that includes the logged in userId and the new location
        const passData = { location: newLoc, userId: props.userId }
        API.editUserLoc(passData).then((newData) => {
        });
        refreshUserData()
        refreshUserData()
    };
    // Functionality that handles the deletion of a specialty
    const delUserLoc = (e) => {
        const locId = e.target.id
        // Create an object that includes the logged in userId and the location
        const passData = { locId: locId, userId: props.userId }
        API.deleteUserLoc(passData).then((newData) => {
        });
        refreshUserData()
        refreshUserData()
    };


    const handleBioInput = (event) => {
        setNewUserBio(event.target.value);
    };
    // Function that runs the APi fetch request from the utils API page
    const editUser = () => {
        // Create an object that includes the logged in userId and the new spec
        const passData = {
            biography: newUserBio,
            userId: props.userId,
            isPhotographer: isPhotographer,
            website: newWebsite,
            videography: videography
        }
        // Runs the fetch request from the API utils page
        API.editUserBio(passData).then((newData) => {
        });
        refreshUserData()
        refreshUserData()
    };

    const handleWebsiteInput = (event) => {
        setNewWebsite(event.target.value)
    }

    // Hooks to adjust the add chip size dynamically with what is being inputed
    const locInputStyle = {
        width: `${newLoc.length * 5 + 50}px`
    };
    const specInputStyle = {
        width: `${newSpec.length * 5 + 50}px`
    };

    // HTML
    if (!editing) { // Will render the basic photographers userInfo
        return (
            <>
            <section className=" userInfoSection bg-zinc-900 ">
                <div className="profilePicture col-span-1  ">
                    <img src="https://media.gq.com/photos/564276266ff00fb522b0741b/master/pass/obama-tout.jpg" height="200" width="200" alt="" />
                </div>
                <div className="bio ">
                    <ul className="biography">
                        <li>Username:&nbsp;{newUserObj.username}</li>
                        <li>About Me:<br /><span>{newUserObj.biography}</span></li>
                    </ul>
                </div>
                <div className="userDetails">
                    {newUserObj.isPhotographer
                        ? <ul>
                            <li className="serveLocationChip" >Serves:&nbsp; {newUserObj.ServeLocations?.map((loc, i) => (
                                <span className="chip" key={i}>{loc.location}&nbsp;</span>
                            ))}
                            </li>
                            <li className="specialtyChip" >Specialties:&nbsp; {newUserObj.Specialties?.map((spec, i) => (
                                <span className="chip" key={i}>{spec.specialty}&nbsp;</span>
                            ))}
                            </li>
                            <li className="websiteAndVideo" >Website:&nbsp;<a target="_blank" href={props.website}>{newUserObj.website}</a></li>
                            {newUserObj.videography
                                ? <li className="websiteAndVideo">Videography: Yes</li>
                                : <li className="websiteAndVideo">Videography: No</li>
                            }
                        </ul>
                        : <></>
                    }
                </div>
                <div className="editBtn container duration-200">
                    <button className= " bg-zinc-700" onClick={toggelEditing} >Edit</button>
                </div>
            </section>
            </>
        );
    } else { // Will render the editable photographer userInfo
        return (
            <section className="userInfoSectionRow bg-zinc-900">
                <div className="profilePicture  col-span-1 row-span-1 ">
                    <img src="https://media.gq.com/photos/564276266ff00fb522b0741b/master/pass/obama-tout.jpg" height="200" width="200" alt="" />
                    <button>Update Image</button>
                </div>
                <div className="editBio mx-auto">
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;Username: {newUserObj.username}</li>
                        <li>&nbsp;&nbsp;&nbsp;About Me: <textarea onChange={handleBioInput} className="textarea" cols="40" rows="6">{newUserObj.biography}</textarea></li>
                    </ul>
                </div>
                <div className="userDetails">
                    {isPhotographer
                        ? <div><p>Are you a a Photographer looking for work?: <input onChange={toggleIsPhotographer} checked  type="checkbox" /></p></div>
                        : <div><p>Are you a a Photographer looking for work?: <input onChange={toggleIsPhotographer} type="checkbox" /></p></div>
                    }
                    {isPhotographer
                        ? <ul>
                        <div className="chipWrap"> <div className="instructions"><span className="text-green-600">+</span> to add, or <span className="text-red-600">x</span> to remove a location</div>
                            <li className="serveLocationChip" >&nbsp; {newUserObj.ServeLocations?.map((loc, i) => (
                                <span className="chip" key={i}>{loc.location}&nbsp;<button onClick={delUserLoc} id={loc.id} className="chipDelete">X</button>&nbsp;</span>
                            ))}
                                <div className="addChip">
                                    <input onChange={handleLocInput} value={newLoc} placeholder="add Location" type="text" style={locInputStyle} />&nbsp;<button onClick={addUserLoc} className="chipDelete">+</button>&nbsp;
                                </div>
                            </li>
                        </div>
                        <div className="chipWrap"> 
                        <div className="instructions"><span className="text-green-600">+</span> to add, or <span className="text-red-600">x</span> to remove a specialty</div>
                            <li className="specialtyChip" >&nbsp; {newUserObj.Specialties?.map((spec, i) => (
                                <span className="chip" key={i}>{spec.specialty}&nbsp;<button onClick={delUserSpec} id={spec.id} className="chipDelete">X</button>&nbsp;</span>
                            ))}
                                <div className="addChip">
                                    <input onChange={handleSpecInput} value={newSpec} placeholder="add specialty" type="text" style={specInputStyle} />&nbsp;<button onClick={addUserSpec} className="chipDelete">+</button>&nbsp;
                                </div>
                            </li>
                        </div>
                        
                        <li>Website: <input onChange={handleWebsiteInput} placeholder={newUserObj.website} className="editInput"></input></li>
                        {videography
                                ? <li>Videography: <input onChange={toggleVideography} checked type="checkbox" /></li>
                                : <li>Videography: <input onChange={toggleVideography} type="checkbox" /></li>
                            }
                    </ul>
                        : <></>
                    }
                </div>
                <div className="editBtn justify-end container">
                    <button className="bg-zinc-700" onClick={() => { toggelEditing(), editUser() }}>Save</button>
                </div>
            </section>
        )
    }
}

// Exports the UserInfo component
export default UserInfo;