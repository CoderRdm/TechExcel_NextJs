// components/TemplateList.js
export const TemplateList = ({ templates }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
                <div key={template.id} className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">{template.name}</h2>
                    <p>Created: {new Date(template.created_at).toLocaleDateString()}</p>
                    {/* Add more template details */}
                </div>
            ))}
        </div>
    );
};