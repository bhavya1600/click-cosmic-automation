# Chat Message Formatting Examples

The chat widget now supports rich text formatting. Here are examples of how different formatting will be displayed:

## Newlines and Paragraphs

**Input:**
```
Hello! This is the first line.

This is a new paragraph after an empty line.
This is the second line of the same paragraph.
```

**Result:** Text will display with proper line breaks and paragraph spacing.

## Bullet Points

**Input:**
```
Here are our services:
• Web Development
• AI Automation
• Digital Marketing
- Custom Solutions
* 24/7 Support
```

**Result:** Will display as properly formatted bullet lists with consistent bullet symbols.

## Numbered Lists

**Input:**
```
Follow these steps:
1. Contact us for consultation
2. We analyze your needs
3. Custom solution development
4. Implementation and support
```

**Result:** Will display as properly formatted numbered lists.

## Bold Text

**Input:**
```
We offer **premium services** at competitive rates.
Our **AI automation solutions** can save you time.
```

**Result:** Text between **double asterisks** will be displayed in bold.

## Combined Formatting

**Input:**
```
**Our Services:**

• **Web Development** - Modern, responsive websites
• **AI Automation** - Streamline your workflows  
• **Digital Marketing** - Grow your online presence

Contact us today!

**Benefits:**
1. **Save Time** - Automate repetitive tasks
2. **Cut Costs** - Reduce operational expenses
3. **Scale Fast** - Grow without proportional cost increases
```

**Result:** Combines all formatting types for rich, structured messages.

## Technical Details

The formatting system handles:
- Line breaks (`\n`) with proper spacing
- Multiple consecutive line breaks for paragraphs
- Bullet points using `-`, `*`, or `•` symbols
- Numbered lists with `1.`, `2.`, etc.
- Bold text wrapped in `**text**`
- Proper alignment and spacing for lists
- Responsive text wrapping