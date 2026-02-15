# Contributing to Accessible Municipal Map Demo

Thank you for your interest in contributing to this accessibility demonstration project!

## Purpose

This project demonstrates best practices for making municipal GIS applications accessible to users who are blind, have low vision, are color-blind, or use keyboard-only navigation. It is intended as an educational reference, not a production application.

## How to Contribute

### Reporting Accessibility Issues

If you find an accessibility barrier or bug:

1. **Test with assistive technology** if possible (screen readers, keyboard-only navigation, etc.)
2. **File an issue** describing:
   - What you expected to happen
   - What actually happened
   - Steps to reproduce
   - Assistive technology used (if applicable)
   - Browser and OS version

### Suggesting Improvements

We welcome suggestions for:
- Additional accessibility features
- Better documentation
- Code improvements
- Additional demonstration scenarios
- Testing procedures

Please file an issue with the `enhancement` label.

### Code Contributions

#### Before You Start

1. **Read the documentation** in [accessibility.html](accessibility.html)
2. **Review the existing code** to understand the patterns
3. **File an issue** to discuss major changes before starting

#### Development Guidelines

**Accessibility First**
- All functionality must work with keyboard only
- All information must be available without the map
- Test with screen readers (NVDA, VoiceOver, JAWS)
- Meet WCAG 2.1 AA standards minimum
- Never rely on color alone

**Code Style**
- Use semantic HTML5
- Follow existing JavaScript patterns
- Comment accessibility decisions explicitly
- Keep dependencies minimal
- Ensure code works in modern browsers

**Testing**
- Test keyboard navigation (Tab, arrows, Enter, Escape)
- Test with screen reader
- Test with browser zoom at 200%
- Test with map hidden
- Verify ARIA announcements

#### Accessibility Testing Checklist

Before submitting a pull request:

- [ ] Can complete all tasks using only keyboard
- [ ] All interactive elements have visible focus indicators
- [ ] All form inputs have associated labels
- [ ] Dynamic content changes are announced to screen readers
- [ ] Color is not the only way information is conveyed
- [ ] All images and icons have appropriate alt text or aria-hidden
- [ ] Tested with at least one screen reader
- [ ] Page structure uses semantic HTML
- [ ] Contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for UI)
- [ ] Works with map completely hidden

### Pull Request Process

1. **Fork the repository** and create a branch
2. **Make your changes** following the guidelines above
3. **Test thoroughly** using the checklist
4. **Update documentation** if needed
5. **Submit a pull request** with:
   - Clear description of changes
   - Accessibility testing results
   - Screenshots/video if relevant

## Code of Conduct

### Our Pledge

This is an accessibility demonstration project. We are committed to:
- Making participation accessible to everyone
- Providing constructive, respectful feedback
- Focusing on what is best for the community and users
- Showing empathy toward others

### Expected Behavior

- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on accessibility and user needs

## Questions?

If you have questions about contributing, please file an issue with the `question` label.

## Recognition

All contributors will be recognized in the project. Thank you for helping make the web more accessible!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
