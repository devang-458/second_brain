import AddContentForm from "@/components/AddContentForm";

export default function Addpage() {
    return (
        <div className="p-6 max-w-3xl mx-auto bg-white w-screen h-screen">
            <h2 className="text-2xl font-bold mb-4 text-black">Create New Content</h2>
            <AddContentForm />
        </div>
    )
}