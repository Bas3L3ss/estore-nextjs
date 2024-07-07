import { fetchProductReviews } from "@/utils/actions";

import ReviewCard from "./ReviewCard";
import SectionTitle from "../global/SectionTitle";
import { auth } from "@clerk/nextjs/server";
import DeleteReview from "./DeleteReview";
async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);
  const user = auth();

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName } = review;
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              {review.clerkId == user.userId && (
                <DeleteReview reviewId={review.id} />
              )}
            </ReviewCard>
          );
        })}
      </div>
    </div>
  );
}
export default ProductReviews;
