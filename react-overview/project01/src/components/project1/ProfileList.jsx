import ProfileCard from "./ProfileCard";

export default function ProfileList({data}){
    return (
        <>
        <div className="profilelist">
            
         <h1>Use props and components</h1>
            <ProfileCard data={data}/>
        </div>
        </>
    );

}