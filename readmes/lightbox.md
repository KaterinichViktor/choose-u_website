Here’s how to use the current lightbox (with the existing styles) to cover all three entry points you mentioned—no CSS changes needed.
1. Image opens when the image itself is clicked
<img  
src="./public/gallery/photo-1.jpg"
alt="Volunteers delivering aid"
class="gallery-thumbnail"  
data-lightbox="impact-gallery" 
data-index="0">

<img  
src="./public/gallery/photo-2.jpg"  
alt="Family reunion"  
class="gallery-thumbnail"  
data-lightbox="impact-gallery"  
data-index="1">
All elements sharing the same data-lightbox value form a gallery. Clicking any of them opens the lightbox.
2. Image gallery opened by a button (or any element)
<button  
class="btn-primary"
data-lightbox-trigger="mission-gallery"
data-lightbox-items='[
{"src":"./public/gallery/story-1.jpg","alt":"Story 1"},
{"src":"./public/gallery/story-2.jpg","alt":"Story 2"},
{"src":"./public/gallery/story-3.jpg","alt":"Story 3"}  ]'>
View Mission Stories
</button>
data-lightbox-trigger names the gallery.
data-lightbox-items provides the slides (JSON array). You can omit this attribute if the same gallery is already defined via clickable images. Optional data-lightbox-start="1" opens on a specific slide.

3. PDF lightbox (full height, current styles preserved)
<button
class="btn-secondary"
data-lightbox-pdf="./documents/statute.pdf">
View Statute PDF
</button>

Any element with data-lightbox-pdf opens the PDF viewer. It automatically applies the existing .lightbox.is-pdf layout, which stretches the iframe to the full viewport height/width while keeping room for the close button.
That’s it—using the current CSS/JS you already have in the repo, these three snippets cover every entry point you asked for.