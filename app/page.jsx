import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MrForm from "@/components/mr-form"

export default function Page() {
  return (
    <main className="min-h-dvh">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-balance">MR Description Writer</h1>
          <p className="text-sm text-muted-foreground">Generate clean, structured MR descriptions</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create a Description</CardTitle>
            <CardDescription className="text-pretty">
              Select a template, paste the Trello card description, add any extra info, then generate a structured MR
              description.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MrForm />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
