import Avatar from "./Avatar";
import SkillTag from "./SkillTag";


export default function ProfileCard({data}) {
    return (
        <>
            {data.map((profile) => (
                <div className="card" key={profile.id}>
                    <Avatar image={profile.image}/>
                    <div className="info">
                        <div className="heading"><h1>{profile.name}</h1>
                            <span>{profile.role}</span></div>
                        <p className="">{profile.bio}</p>
                    </div>
                    <SkillTag skills={profile.skills} />
                </div>
            ))}

        </>
    );
}