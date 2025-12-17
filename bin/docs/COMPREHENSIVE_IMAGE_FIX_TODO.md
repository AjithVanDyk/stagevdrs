# COMPREHENSIVE IMAGE FIX TODO - ALL 50 PAGES

## Audit Summary
- **Total Pages Checked**: 50 pages + components
- **Total Image References**: 160 unique references
- **Issues Found**: 16 total issues
  - Missing images: 2
  - Case mismatches (URL encoding issues): 14

---

## CRITICAL FIXES NEEDED

### 1. CONFIG/IMAGES.TS - Central Configuration File
**Status**: ⚠️ **14 CASE MISMATCHES** - All paths with spaces need URL encoding

**Issues**:
1. `/Images/Logos/Van Dyk University logo.png` → Should be `/Images/Logos/Van%20Dyk%20University%20logo.png`
2. `/Images/Equipment/Bollegraaf/Product image_baler.jpg` → Should be `/Images/Equipment/Bollegraaf/Product%20image_baler.jpg`
3. `/Images/Equipment/Tomra Optical sorters/product image_tomra.jpg` → Should be `/Images/Equipment/Tomra%20Optical%20sorters/product%20image_tomra.jpg`
4. `/Images/Equipment/Pellenc optical sorters/Product image_pellenc.JPG` → Should be `/Images/Equipment/Pellenc%20optical%20sorters/Product%20image_pellenc.JPG`
5. `/Images/Equipment/Lubo Screens/Product image_lubo screens.jpg` → Should be `/Images/Equipment/Lubo%20Screens/Product%20image_lubo%20screens.jpg`
6. `/Images/Equipment/Gunther screens/IMG_8615.jpg` → Should be `/Images/Equipment/Gunther%20screens/IMG_8615.jpg`
7. `/Images/Equipment/Smicon Food Waste Depackagers/VDRS Smicon system Sunnyvale.jpeg` → Should be `/Images/Equipment/Smicon%20Food%20Waste%20Depackagers/VDRS%20Smicon%20system%20Sunnyvale.jpeg`
8. `/Images/Equipment/Centriair Odor Control/Emscher_09 S 010a_P1001419.JPG` → Should be `/Images/Equipment/Centriair%20Odor%20Control/Emscher_09%20S%20010a_P1001419.JPG`
9. `/Images/Equipment/Greyparrot AI/Greyparrot-GP5-on-belt.png` → Should be `/Images/Equipment/Greyparrot%20AI/Greyparrot-GP5-on-belt.png`
10. `/Images/Equipment/Densimetric table/Densimetric table_Zbest.jpeg` → Should be `/Images/Equipment/Densimetric%20table/Densimetric%20table_Zbest.jpeg`
11. `/Images/Equipment/Beefoam dust suppression/after beefoam.JPG` → Should be `/Images/Equipment/Beefoam%20dust%20suppression/after%20beefoam.JPG`
12. `/Images/Equipment/Reckelberg Environmental Technologies/impactreactor.webp` → Should be `/Images/Equipment/Reckelberg%20Environmental%20Technologies/impactreactor.webp`
13. `/Images/Equipment/Certified Pre-owned Equipment/rebuilt baler.png` → Should be `/Images/Equipment/Certified%20Pre-owned%20Equipment/rebuilt%20baler.png`
14. `/Images/Equipment/Header image for Equipment grid.jpg` → Should be `/Images/Equipment/Header%20image%20for%20Equipment%20grid.jpg`

**Action**: Update all paths in `src/config/images.ts` to use URL-encoded format (`%20` for spaces)

---

### 2. MISSING IMAGES

#### 2.1 CentriairOdorControlPage.tsx
- **Missing**: `/Images/Equipment/Centriair Odor Control/Screenshot 2025-10-02 at 1.38.37?PM.png`
- **Issue**: File has special character `?` in filename
- **Action**: 
  - Check if file exists with different name
  - If exists, update reference to match exact filename
  - If missing, remove reference or use fallback image

#### 2.2 PlasticsRecyclingPage.tsx
- **Missing**: `/Images/plastics-recycling-white-bg.mp4`
- **Action**: 
  - Add the video file to `public/Images/`
  - OR remove the reference from the code
  - OR use a fallback image

---

## PAGE-BY-PAGE FIX CHECKLIST

### Core Pages (1-15)

#### ✅ Page 1: HOME.tsx
- [ ] Hero image: `/Images/image-1749759459073.png` ✓
- [ ] Service images: All 4 service cards ✓
- [ ] Training logo: `/Images/Logos/Van Dyk University logo.png` → **NEEDS ENCODING**
- [ ] Order parts images ✓

#### ✅ Page 2: NAVBAR.tsx (Component)
- [ ] Logo: `/Images/van-dyk-logo-white.svg` ✓
- [ ] Fallback chain updated ✓

#### ✅ Page 3: FOOTER.tsx (Component)
- [ ] Logo: `/Images/van-dyk-logo-white.svg` ✓
- [ ] Fallback chain updated ✓

#### ⚠️ Page 4: NEWS & MEDIA.tsx
- [ ] Hero: `/Images/Equipment/Header image for Equipment grid.jpg` → **NEEDS ENCODING**
- [ ] All article images in `newsData` array ✓

#### ⚠️ Page 5: SERVICES & SUPPORT.tsx
- [ ] Support card images: `/Images/Services/Support/Header image_Support.jpeg` → **FIXED** ✓
- [ ] Test Center: `/Images/Services/Test Center/Test Center 2025 best.JPG` → **FIXED** ✓
- [ ] Background images in inline styles ✓

#### ⚠️ Page 6: SUPPORT.tsx
- [ ] Hero: `/Images/Services/Support/Header image_Support.jpeg` → **NEEDS ENCODING** (already encoded in code)
- [ ] All section images ✓

#### ⚠️ Page 7: EQUIPMENT.tsx
- [ ] Hero image ✓
- [ ] Equipment cards: Check all paths with spaces

#### ⚠️ Page 8: SOLUTIONS.tsx
- [ ] Hero image ✓
- [ ] Solution categories: Check all paths with spaces

#### ✅ Page 9: ABOUT.tsx
- [ ] Slideshow images ✓
- [ ] Leadership images ✓

#### ✅ Page 10: CONTACT.tsx
- [ ] Hero image ✓
- [ ] Gallery images ✓

#### ✅ Page 11: CAREERS.tsx
- [ ] Hero image ✓
- [ ] Slideshow images ✓

#### ✅ Page 12: VIDEOS.tsx
- [ ] Hero image ✓
- [ ] Video thumbnails ✓

#### ✅ Page 13: EXPERT TIPS.tsx
- [ ] All tip images (using fallbacks) ✓

#### ⚠️ Page 14: VAN DYK UNIVERSITY.tsx
- [ ] Logo: `/Images/Logos/Van Dyk University logo.png` → **FIXED** ✓
- [ ] Training School images ✓

#### ⚠️ Page 15: PARTS IN STOCK.tsx
- [ ] Product images with spaces → **NEED ENCODING IN CODE**

---

### Equipment Pages (16-29)

#### ⚠️ Page 16: PMI.tsx
- [ ] Background image in inline style ✓

#### ✅ Page 17: TEST CENTER.tsx
- [ ] Gallery images ✓

#### ⚠️ Page 18: BOLLEGRAAF PAGE.tsx
- [ ] Main image: `/Images/Equipment/Bollegraaf/Product image_baler.jpg` → **NEEDS ENCODING**
- [ ] Gallery images with spaces (WM Mesquite Creek-*.jpg) → **NEED ENCODING**

#### ⚠️ Page 19: TOMRA PAGE.tsx
- [ ] Main image: `/Images/Equipment/Tomra Optical sorters/product image_tomra.jpg` → **NEEDS ENCODING**
- [ ] Gallery images (Gallery 1-7_tomra.*) → **NEED ENCODING**

#### ⚠️ Page 20: PELLENC ST PAGE.tsx
- [ ] Main image: `/Images/Equipment/Pellenc optical sorters/Product image_pellenc.JPG` → **NEEDS ENCODING**
- [ ] Gallery images (Gallery 1-7, 13_pellenc.JPG) → **NEED ENCODING**

#### ⚠️ Page 21: LUBO SCREENING PAGE.tsx
- [ ] Main image: `/Images/Equipment/Lubo Screens/Product image_lubo screens.jpg` → **NEEDS ENCODING**
- [ ] Gallery images (Gallery 1-12, including "880 stars.JPG", "sizing screens.JPG") → **NEED ENCODING**

#### ✅ Page 22: GUNTHER SCREENS PAGE.tsx
- [ ] Gallery images ✓

#### ⚠️ Page 23: CENTRIAIR ODOR CONTROL PAGE.tsx
- [ ] Gallery: `/Images/Equipment/Centriair Odor Control/Emscher_09 S 010a_P1001419.JPG` → **NEEDS ENCODING**
- [ ] **MISSING**: `/Images/Equipment/Centriair Odor Control/Screenshot 2025-10-02 at 1.38.37?PM.png` → **FIX OR REMOVE**

#### ✅ Page 24: GREYPARROT AI PAGE.tsx
- [ ] Gallery images ✓

#### ⚠️ Page 25: DENSIMETRIC TABLE PAGE.tsx
- [ ] Gallery images with spaces → **NEED ENCODING**

#### ⚠️ Page 26: BEEFOAM DUST SUPPRESSION PAGE.tsx
- [ ] Gallery images with spaces → **NEED ENCODING**

#### ✅ Page 27: RECKELBERG ENVIRONMENTAL PAGE.tsx
- [ ] Gallery images ✓

#### ⚠️ Page 28: SMICON DEPACKAGER PAGE.tsx
- [ ] Gallery images with spaces → **NEED ENCODING**

#### ⚠️ Page 29: CERTIFIED PRE-OWNED PAGE.tsx
- [ ] Gallery: `/Images/Equipment/Certified Pre-owned Equipment/rebuilt baler.png` → **NEEDS ENCODING**

---

### Solution Pages (30-46)

#### ✅ Page 30: SINGLE STREAM RECYCLING PAGE.tsx
- [ ] All images ✓

#### ⚠️ Page 31: PLASTICS RECYCLING PAGE.tsx
- [ ] **MISSING**: `/Images/plastics-recycling-white-bg.mp4` → **ADD FILE OR REMOVE REFERENCE**

#### ✅ Pages 32-46: All other solution pages
- [ ] Check all images ✓

---

### Other Pages (47-50)

#### ✅ Page 47: OUR CUSTOMERS IN THE NEWS.tsx
- [ ] All news article images ✓

#### ✅ Page 48: REMOTE TROUBLESHOOTING.tsx
- [ ] Hero image ✓
- [ ] Vision AR demo (using fallback) ✓

#### ⚠️ Page 49: CONFIG/IMAGES.ts
- [ ] **14 CASE MISMATCHES** → **FIX ALL URL-ENCODED PATHS**

#### ✅ Page 50: COMPONENTS
- [ ] NewsSlideshow.tsx ✓
- [ ] IndustryRecognition.tsx ✓
- [ ] Other components ✓

---

## PRIORITY FIX ORDER

### 🔴 CRITICAL (Do First)
1. **CONFIG/IMAGES.TS** - Fix all 14 URL-encoded paths
2. **CentriairOdorControlPage.tsx** - Fix missing image reference
3. **PlasticsRecyclingPage.tsx** - Fix missing .mp4 file reference

### 🟡 HIGH PRIORITY (Do Second)
4. All Equipment pages with spaces in paths (Pages 18-21, 23, 25-26, 28-29)
5. News & Media hero image
6. Services & Support images
7. Parts In Stock images

### 🟢 MEDIUM PRIORITY (Do Third)
8. All Solution pages
9. Other pages with minor issues

---

## FIX STRATEGY

1. **URL Encoding**: Replace all spaces in image paths with `%20`
   - Example: `/Images/Equipment/Product image.jpg` → `/Images/Equipment/Product%20image.jpg`

2. **Missing Images**: 
   - Check if file exists with different name/case
   - If exists, update reference
   - If missing, use fallback or remove reference

3. **Special Characters**: 
   - Handle `?` in filenames carefully
   - May need to URL-encode: `?` → `%3F`

4. **Case Sensitivity**: 
   - Ensure all paths match exact filename case
   - Vercel uses Linux (case-sensitive filesystem)

---

## VERIFICATION

After fixes, run:
```bash
npm run verify:images
npm run build
```

Check that:
- ✅ All images load correctly
- ✅ No 404 errors in browser console
- ✅ Build completes successfully
- ✅ All pages display images correctly

---

**Total Issues to Fix**: 16
**Estimated Time**: 2-3 hours
**Status**: 🔴 **IN PROGRESS**










