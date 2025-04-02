import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-md p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold">Bounty</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Bounty</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                Bounty is a modern freelancing platform designed to connect talented professionals with clients seeking
                quality work. Our mission is to create a seamless, transparent, and fair marketplace where skills are
                valued and opportunities are accessible to all.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary text-xl font-bold">1</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2">Post a Task</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Clients describe their project, set a budget, and specify requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary text-xl font-bold">2</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2">Receive Proposals</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Talented freelancers submit proposals outlining their approach and pricing.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary text-xl font-bold">3</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2">Collaborate & Pay</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Work together through our platform and release payment when satisfied.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Why Choose Bounty</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Secure Payments</h3>
                    <p className="text-muted-foreground">
                      Our escrow system ensures that freelancers get paid for their work and clients receive quality
                      deliverables.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Quality Talent</h3>
                    <p className="text-muted-foreground">
                      Our platform attracts skilled professionals across various fields, ensuring high-quality work.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Transparent Fees</h3>
                    <p className="text-muted-foreground">
                      We believe in clear pricing with no hidden fees, so you always know what to expect.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
              <div className="flex justify-center gap-4">
                <Link href="/register">
                  <Button size="lg">Sign up now</Button>
                </Link>
                <Link href="/tasks">
                  <Button variant="outline" size="lg">
                    Browse tasks
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary rounded-md p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-lg font-bold">Bounty</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">Connecting talent with opportunity</p>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm hover:text-primary">
                About
              </Link>
              <Link href="/terms" className="text-sm hover:text-primary">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm hover:text-primary">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8">
            &copy; {new Date().getFullYear()} Bounty. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

