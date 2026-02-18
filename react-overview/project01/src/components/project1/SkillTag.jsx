
function SkillTag({skills}) {
    return (
        skills.map((skill) => (
            <div className='skill'>
                <span>{skill}</span>
            </div>
        ))


    )
}

export default SkillTag