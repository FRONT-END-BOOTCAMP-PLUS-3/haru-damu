import { useState } from 'react';
import styles from './modal.module.css';

export function Modal({ children }: { children: React.ReactNode }) {
    // 함수나 자바스크립트 코드 영역
    // 변수함수 등 로직

    // 모달 열기, 닫기 상태
    const [isOpen, setIsOpen] = useState(true);

     // 모달 외부 클릭 시 닫히는 함수
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false); // 외부 클릭 시 모달 닫기
        }
    };
    
    // 모달이 닫히면 아무것도 렌더링하지 않음
    if (!isOpen) return null;

    return (
        // 태그 구조
        <div
            className={styles.overlay} // overlay 스타일 적용
            onClick={handleOverlayClick} // 외부 클릭 시 닫히도록 처리
        >
            <div className={styles.modal}> {/* modal 스타일 적용 */}
                <div className={styles.modalContent}> {/* modalContent 스타일 적용 */}
                    {children} {/* children을 모달 내부에 렌더링 */}
                </div>
            </div>
        </div>
    );
}