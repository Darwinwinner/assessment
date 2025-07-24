import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {Article} from "@/types";
import { MessageCircle } from "lucide-react";

export const ArticleCard = ({article }: { article: Article }) => {

    const url = article.url || article.story_url;
    if (!article.title && !article.story_title) {
        return null; // If no title or story title, don't render the card
    }

    return (
        <a href={url || "#"} target="_blank" rel="noopener noreferrer">
            <Card className="h-56 md:h-64 lg:h-72 w-full flex flex-col justify-between hover:shadow-md transition cursor-pointer border-gray-200">
                <CardHeader className="flex-grow  px-4 items-center">
                    <CardTitle className="text-xl md:text-2xl font-bold line-clamp-2">
                        {article.title || article.story_title}
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col gap-2 px-4">
                    
                    <p className="text-base text-muted-foreground line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        non risus. Suspendisse lectus tortor, dignissim sit amet.
                    </p>
                    <p className="text-sm">
                        <span className="mr-2 text-muted-foreground font-medium">Author:</span>
                        <span className="inline-block bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-md">
                            {article.author || "Unknown"}
                        </span>
                    </p>
                </CardContent>
    
                <CardFooter className="flex items-center justify-between  px-4 py-2">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MessageCircle className="w-4 h-4" />
                        {article.num_comments ?? 0} comments
                    </div>
                </CardFooter>
            </Card>

        </a>
    );
}