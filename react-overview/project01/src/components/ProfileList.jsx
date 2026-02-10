import ProfileCard from "./ProfileCard";

export default function ProfileList({data}){
    return (
        <>
        <div className="profilelist">
            <ProfileCard data={data}/>
        </div>
        </>
    );

}