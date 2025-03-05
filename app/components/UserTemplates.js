const UserTemplates = ({ templates }) => {
    if (!templates.length) {
        return <p>No templates found.</p>;
    }

    return (
        <div>
            {templates.map((template, index) => (
                <div key={index}>
                    <h2>{template.header.title}</h2>
                    <p>{template.header.subtitle}</p>
                    <h3>Skills:</h3>
                    <ul>
                        {template.skills.map((s, i) => (
                            <li key={i}>{s.skill.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default UserTemplates;