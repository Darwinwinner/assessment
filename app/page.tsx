import {redirect} from "next/navigation";

export default function Home() {
  // Redirect to the articles page
  redirect("/articles");
}
