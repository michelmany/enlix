export default function Dashboard() {
    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to your Dashboard
                </h2>
                <p className="text-gray-600 mb-6">
                    Manage your page content, template, and settings here.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-2">Edit Content</h3>
                        <p className="text-gray-600 text-sm">
                            Update your page title, description, and links
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-2">Change Template</h3>
                        <p className="text-gray-600 text-sm">
                            Switch between Lumi, Noir, and Sage templates
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-2">View Page</h3>
                        <p className="text-gray-600 text-sm">
                            See how your page looks to visitors
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
