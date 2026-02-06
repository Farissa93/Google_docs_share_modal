// Help menu
const helpBtn = document.getElementById('helpBtn');
const helpDropdown = document.getElementById('helpDropdown');

if (helpBtn && helpDropdown) {
    helpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        helpDropdown.classList.toggle('show');
    });

    const handleHelpOutsidePointer = (event) => {
        if (!helpBtn.contains(event.target) && !helpDropdown.contains(event.target)) {
            helpDropdown.classList.remove('show');
        }
    };

    document.addEventListener('pointerdown', handleHelpOutsidePointer, true);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            helpDropdown.classList.remove('show');
        }
    });

    // Help menu items
    const helpMenuItems = document.querySelectorAll('.help-menu-item');
    helpMenuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index === 0) {
                console.log('Help clicked');
            } else if (index === 1) {
                console.log('Send feedback to Google clicked');
            }
            helpDropdown.classList.remove('show');
        });
    });
}

// Email suggestions
const addPeopleInput = document.getElementById('addPeopleInput');
const emailSuggestions = document.getElementById('emailSuggestions');
const addPeopleAvatar = document.getElementById('addPeopleAvatar');

const randomEmails = [
    'john.smith@gmail.com',
    'sarah.williams@example.com',
    'michael.johnson@company.org',
    'emily.davis@email.com',
    'david.brown@work.com',
    'jessica.miller@domain.com',
    'christopher.wilson@corp.net',
    'ashley.moore@mail.com',
    'andrew.taylor@business.com',
    'amanda.anderson@professional.org'
];

function getRandomEmails(count = 5) {
    const shuffled = [...randomEmails].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function displayEmailSuggestions() {
    const emails = getRandomEmails(5);
    emailSuggestions.innerHTML = '';
    
    emails.forEach(email => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'email-suggestion-item';
        const [name] = email.split('@');
        const initials = name.split('.').map(part => part[0]).filter(Boolean).join('').slice(0, 2).toUpperCase() || email[0].toUpperCase();
        const displayName = name.split('.').map(part => part ? part.charAt(0).toUpperCase() + part.slice(1) : '').join(' ').trim();

        suggestionItem.innerHTML = `
            <div class="email-suggestion-avatar">${initials}</div>
            <div class="email-suggestion-text">
                <span class="email-suggestion-name">${displayName || email}</span>
                <span class="email-suggestion-email">${email}</span>
            </div>
        `;
        
        suggestionItem.addEventListener('click', () => {
            addPersonToList(email);
            addPeopleInput.value = '';
            emailSuggestions.classList.remove('show');
            if (addPeopleAvatar) {
                addPeopleAvatar.classList.remove('show');
                addPeopleAvatar.textContent = '';
            }
        });
        
        emailSuggestions.appendChild(suggestionItem);
    });
    
    emailSuggestions.classList.add('show');
}

function updateAddPeopleAvatar(value) {
    if (!addPeopleAvatar) return;

    const trimmed = value.trim();
    const match = trimmed.match(/[a-zA-Z0-9]/);

    if (match) {
        addPeopleAvatar.textContent = match[0].toUpperCase();
        addPeopleAvatar.classList.add('show');
    } else {
        addPeopleAvatar.classList.remove('show');
        addPeopleAvatar.textContent = '';
    }
}

function addPersonToList(email) {
    const peopleList = document.getElementById('peopleList');
    const [name] = email.split('@');
    const initials = name.split('.').map(n => n[0].toUpperCase()).join('');
    
    const personItem = document.createElement('div');
    personItem.className = 'person-item';
    personItem.innerHTML = `
        <div class="person-avatar">${initials || 'U'}</div>
        <div class="person-info">
            <p class="person-name">${name.split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')}</p>
            <p class="person-email">${email}</p>
        </div>
        <span class="person-role-label">Editor</span>
    `;
    
    peopleList.appendChild(personItem);
}

if (addPeopleInput && emailSuggestions) {
    addPeopleInput.addEventListener('focus', () => {
        displayEmailSuggestions();
        updateAddPeopleAvatar(addPeopleInput.value);
    });

    addPeopleInput.addEventListener('input', () => {
        const currentValue = addPeopleInput.value;
        updateAddPeopleAvatar(currentValue);

        if (currentValue.trim()) {
            if (!emailSuggestions.classList.contains('show')) {
                displayEmailSuggestions();
            }
        } else {
            emailSuggestions.classList.remove('show');
        }
    });

    addPeopleInput.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            emailSuggestions.classList.remove('show');
            if (!addPeopleInput.value.trim()) {
                updateAddPeopleAvatar('');
            }
            addPeopleInput.blur();
        }
    });

    const handleOutsidePointer = (event) => {
        const isInInput = addPeopleInput.contains(event.target);
        const isInSuggestions = emailSuggestions.contains(event.target);

        if (!isInInput && !isInSuggestions) {
            emailSuggestions.classList.remove('show');
            if (!addPeopleInput.value.trim()) {
                updateAddPeopleAvatar('');
            }
        }
    };

    document.addEventListener('mousedown', handleOutsidePointer, true);
}

// Modal controls
const modalOverlay = document.getElementById('modalOverlay');
const shareModal = document.getElementById('shareModal');
const doneBtn = document.getElementById('doneBtn');

if (modalOverlay && shareModal && doneBtn) {
    // Close modal functions
    function closeModal() {
        shareModal.style.display = 'none';
        modalOverlay.style.display = 'none';
    }

    doneBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Prevent modal from closing when clicking inside it
    shareModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}


const backBtn = document.getElementById('backBtn');
const cancelDetailsBtn = document.getElementById('cancelDetailsBtn');
const sendBtn = document.getElementById('sendBtn');
const detailsModalOverlay = document.getElementById('detailsModalOverlay');
const shareDetailsModal = document.getElementById('shareDetailsModal');
const chipRemoveBtn = document.getElementById('chipRemoveBtn');

function closeDetailsModal() {
    const shareModal = document.getElementById('shareModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const shareDetailsModal = document.getElementById('shareDetailsModal');
    const detailsModalOverlay = document.getElementById('detailsModalOverlay');
    
    
    shareDetailsModal.style.display = 'none';
    detailsModalOverlay.style.display = 'none';
    shareModal.style.display = 'flex';
    modalOverlay.style.display = 'block';
}

if (backBtn) {
    backBtn.addEventListener('click', closeDetailsModal);
}

if (cancelDetailsBtn) {
    cancelDetailsBtn.addEventListener('click', closeDetailsModal);
}

if (chipRemoveBtn) {
    chipRemoveBtn.addEventListener('click', () => {
        closeDetailsModal();
    });
}

if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const email = document.getElementById('selectedEmailText').textContent;
        const role = document.getElementById('roleDropdown').value;
        const notifyPeople = document.getElementById('notifyCheckbox').checked;
        const message = document.getElementById('messageTextarea').value;
        
        console.log('Share sent:', { email, role, notifyPeople, message });
        
        showToast('Invitation sent', 2000);
        setTimeout(closeDetailsModal, 2000);
    });
}

if (detailsModalOverlay) {
    detailsModalOverlay.addEventListener('click', closeDetailsModal);
}

if (shareDetailsModal) {
    shareDetailsModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Copy link function
const copyLinkFooterBtn = document.getElementById('copyLinkFooterBtn');
const toastNotification = document.getElementById('toastNotification');
let toastTimeoutId = null;

function showToast(message, duration = 3000) {
    if (!toastNotification) return;

    toastNotification.textContent = message;
    toastNotification.classList.add('show');

    if (toastTimeoutId) {
        clearTimeout(toastTimeoutId);
    }

    toastTimeoutId = setTimeout(() => {
        toastNotification.classList.remove('show');
        toastTimeoutId = null;
    }, duration);
}

function fallbackCopyText(link) {
    const tempInput = document.createElement('textarea');
    tempInput.value = link;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);

    const selection = document.getSelection ? document.getSelection() : null;
    const selectedRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    tempInput.select();

    let successful = false;
    try {
        successful = document.execCommand && document.execCommand('copy');
    } catch (error) {
        console.error('Fallback copy failed:', error);
    }

    document.body.removeChild(tempInput);

    if (selectedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
    }

    if (successful) {
        showToast('Link copied');
    } else {
        showToast('Copy failed');
    }
}

if (copyLinkFooterBtn) {
    copyLinkFooterBtn.addEventListener('click', () => {
        const link = 'https://docs.google.com/document/d/1An7SHARED_LINK_HERE';

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link)
                .then(() => {
                    showToast('Link copied');
                })
                .catch((error) => {
                    console.warn('Navigator clipboard copy failed:', error);
                    fallbackCopyText(link);
                });
        } else {
            fallbackCopyText(link);
        }
    });
}

// General access
const accessIcon = document.getElementById('accessIcon');
const accessDescription = document.getElementById('accessDescription');
const accessPermissionContainer = document.getElementById('accessPermissionContainer');
const accessTrigger = document.getElementById('accessTrigger');
const accessTriggerLabel = document.getElementById('accessTriggerLabel');
const accessMenu = document.getElementById('accessMenu');
const accessOptions = accessMenu ? Array.from(accessMenu.querySelectorAll('.access-option')) : [];
const permissionTrigger = document.getElementById('permissionTrigger');
const permissionTriggerLabel = document.getElementById('permissionTriggerLabel');
const permissionMenu = document.getElementById('permissionMenu');
const permissionOptions = permissionMenu ? Array.from(permissionMenu.querySelectorAll('.permission-option')) : [];

function updateGeneralAccessUI(value, description) {
    if (!accessIcon || !accessDescription || !accessPermissionContainer) return;

    if (value === 'anyone') {
        accessIcon.classList.add('anyone');
        accessIcon.innerHTML = '<i class="fas fa-globe-americas"></i>';
        accessDescription.textContent = description || 'Anyone on the internet with the link can view';
        accessPermissionContainer.style.display = 'flex';
    } else {
        accessIcon.classList.remove('anyone');
        accessIcon.innerHTML = '<i class="fas fa-lock"></i>';
        accessDescription.textContent = description || 'Only people with access can open with the link';
        accessPermissionContainer.style.display = 'none';
        closePermissionMenu();
    }
}

function setActiveAccessOption(option) {
    accessOptions.forEach((opt) => {
        const isActive = opt === option;
        opt.classList.toggle('active', isActive);
        opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const value = option.dataset.value;
    const description = option.dataset.description;

    if (accessTriggerLabel) {
        accessTriggerLabel.textContent = option.querySelector('.access-option-text').textContent;
    }

    updateGeneralAccessUI(value, description);
}

function closeAccessMenu() {
    if (accessTrigger) {
        accessTrigger.setAttribute('aria-expanded', 'false');
    }
    if (accessMenu) {
        accessMenu.classList.remove('show');
    }
}

function openAccessMenu() {
    if (accessTrigger) {
        accessTrigger.setAttribute('aria-expanded', 'true');
    }
    if (accessMenu) {
        accessMenu.classList.add('show');
    }
}

function toggleAccessMenu() {
    if (!accessTrigger || !accessMenu) return;
    const expanded = accessTrigger.getAttribute('aria-expanded') === 'true';
    if (expanded) {
        closeAccessMenu();
    } else {
        openAccessMenu();
    }
}

function setActivePermissionOption(option) {
    if (!permissionTriggerLabel) return;

    permissionOptions.forEach((opt) => {
        const isActive = opt === option;
        opt.classList.toggle('active', isActive);
        opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const label = option.querySelector('.permission-option-text');
    if (label) {
        permissionTriggerLabel.textContent = label.textContent;
    }
}

function closePermissionMenu() {
    if (permissionTrigger) {
        permissionTrigger.setAttribute('aria-expanded', 'false');
    }
    if (permissionMenu) {
        permissionMenu.classList.remove('show');
    }
}

function openPermissionMenu() {
    if (permissionTrigger) {
        permissionTrigger.setAttribute('aria-expanded', 'true');
    }
    if (permissionMenu) {
        permissionMenu.classList.add('show');
    }
}

function togglePermissionMenu() {
    if (!permissionTrigger || !permissionMenu) return;
    const expanded = permissionTrigger.getAttribute('aria-expanded') === 'true';
    if (expanded) {
        closePermissionMenu();
    } else {
        openPermissionMenu();
    }
}

if (accessTrigger && accessMenu && accessOptions.length) {
    // Initialize default state
    setActiveAccessOption(accessOptions[0]);

    accessTrigger.addEventListener('click', () => {
        toggleAccessMenu();
    });

    accessTrigger.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (accessTrigger.getAttribute('aria-expanded') !== 'true') {
                openAccessMenu();
            }
            const activeOption = accessMenu.querySelector('.access-option.active');
            if (activeOption) {
                activeOption.focus();
            }
        } else if (event.key === 'Escape') {
            closeAccessMenu();
        }
    });

    accessOptions.forEach((option) => {
        option.setAttribute('tabindex', '-1');

        option.addEventListener('click', () => {
            setActiveAccessOption(option);
            closeAccessMenu();
            accessTrigger.focus();
        });

        option.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveAccessOption(option);
                closeAccessMenu();
                accessTrigger.focus();
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                const currentIndex = accessOptions.indexOf(option);
                const nextOption = accessOptions[(currentIndex + 1) % accessOptions.length];
                nextOption.focus();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                const currentIndex = accessOptions.indexOf(option);
                const prevOption = accessOptions[(currentIndex - 1 + accessOptions.length) % accessOptions.length];
                prevOption.focus();
            } else if (event.key === 'Escape') {
                event.preventDefault();
                closeAccessMenu();
                accessTrigger.focus();
            }
        });
    });

    const handleAccessMenuOutside = (event) => {
        const isInsideMenu = accessMenu.contains(event.target);
        const isTrigger = accessTrigger.contains(event.target);
        if (!isInsideMenu && !isTrigger) {
            closeAccessMenu();
        }
    };

    document.addEventListener('pointerdown', handleAccessMenuOutside, true);

    if (accessMenu) {
        accessMenu.addEventListener('focusout', (event) => {
            const nextTarget = event.relatedTarget;
            if (!nextTarget || (!accessMenu.contains(nextTarget) && !accessTrigger.contains(nextTarget))) {
                closeAccessMenu();
            }
        });
    }
}

if (permissionTrigger && permissionMenu && permissionOptions.length) {
    setActivePermissionOption(permissionOptions[0]);

    permissionTrigger.addEventListener('click', () => {
        togglePermissionMenu();
    });

    permissionTrigger.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (permissionTrigger.getAttribute('aria-expanded') !== 'true') {
                openPermissionMenu();
            }
            const activeOption = permissionMenu.querySelector('.permission-option.active');
            if (activeOption) {
                activeOption.focus();
            }
        } else if (event.key === 'Escape') {
            closePermissionMenu();
        }
    });

    permissionOptions.forEach((option) => {
        option.setAttribute('tabindex', '-1');

        option.addEventListener('click', () => {
            setActivePermissionOption(option);
            closePermissionMenu();
            permissionTrigger.focus();
        });

        option.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActivePermissionOption(option);
                closePermissionMenu();
                permissionTrigger.focus();
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                const currentIndex = permissionOptions.indexOf(option);
                const nextOption = permissionOptions[(currentIndex + 1) % permissionOptions.length];
                nextOption.focus();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                const currentIndex = permissionOptions.indexOf(option);
                const prevOption = permissionOptions[(currentIndex - 1 + permissionOptions.length) % permissionOptions.length];
                prevOption.focus();
            } else if (event.key === 'Escape') {
                event.preventDefault();
                closePermissionMenu();
                permissionTrigger.focus();
            }
        });
    });

    const handlePermissionMenuOutside = (event) => {
        const isInsideMenu = permissionMenu.contains(event.target);
        const isTrigger = permissionTrigger.contains(event.target);
        if (!isInsideMenu && !isTrigger) {
            closePermissionMenu();
        }
    };

    document.addEventListener('pointerdown', handlePermissionMenuOutside, true);

    permissionMenu.addEventListener('focusout', (event) => {
        const nextTarget = event.relatedTarget;
        if (!nextTarget || (!permissionMenu.contains(nextTarget) && !permissionTrigger.contains(nextTarget))) {
            closePermissionMenu();
        }
    });
}

